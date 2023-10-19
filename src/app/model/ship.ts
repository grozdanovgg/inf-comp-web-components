import { bytes, refStrings } from 'src/app/model/serial-number-translation';

export class Ship {
  static INSTANCE_ID_LENGTH = 8;
  static SHIP_ID_LENGTH = 14; // Actually this should be named categoryId, but requires a change in the model in the Platform... 
  static SERIAL_NUMBER_LENGTH = 22; // This is actually the ship (asset) id

  NFTAssetID?: string;
  ShipID!: string;
  SerialNumber?: string; // front-end only property
  InstanceID?: string; //front-end only property
  CategoryName!: string;
  Force!: string;
  Class!: string;
  Images!: Images;
  Description!: string;
  Characteristics!: Characteristics;
  Strengths!: string;
  Weaknesses!: string;
  Stats!: Stat[];
  Abilities!: Ability[];
  PendingWithdrawal!: boolean;

  constructor(ship: Partial<Ship>) {
    Object.assign(this, ship);

    this.InstanceID && this.setTranslatedShipSerialNumber();
  }

  // The translation logic is by this example
  // https://pixelmatic.atlassian.net/wiki/spaces/IF/pages/1360330830/Ship+Serial+Number - conversion.js

  private extractRef(refName: string): string {
    const identifier = parseInt(this.ShipID?.slice(...bytes[refName]), 16);

    if (identifier in refStrings[refName] === false) return 'unknown ship';

    return refStrings[refName][identifier];
  }

  private convertToAZNotation(): string {
    if (!this.InstanceID) {
      return 'no InstanceID provided';
    }

    const instanceID = parseInt(this.InstanceID, 16);

    if (instanceID < 1) {
      return 'id below zero';
    }

    if (instanceID >= 249976) {
      return `Z${(instanceID - 249975)
        .toString()
        .padStart(4, '0')}`;
    }

    const letter = Math.floor((instanceID - 1) / 9999);
    const letterChar = String.fromCharCode('A'.charCodeAt(0) + letter);

    return `${letterChar}${(instanceID - letter * 9999).toString().padStart(4, '0')}`;
  }

  private setTranslatedShipSerialNumber(): void {
    this.SerialNumber = '';
    this.SerialNumber += this.extractRef('generation');
    this.SerialNumber += this.extractRef('type');
    this.SerialNumber += '-';
    this.SerialNumber += this.extractRef('class');
    this.SerialNumber +=
      'MK' + parseInt(this.ShipID?.slice(...bytes['mark']), 16).toString() + '-';

    this.SerialNumber += this.convertToAZNotation();
  }
}

export type Images = {
  Top: string;
  Back: string;
  Front: string;
  Bottom: string;
};

type Characteristics = {
  Armor: string;
  Mechs: string;
  Shield: string;
  Dimensions: string;
  EnergyProduction: string;
  WeaponHardpoints: string;
  LocalSensorRange: string;
};

type Stat = {
  Name: string;
  Value: number;
};

type Ability = {
  Name: string;
  Image: string;
  Value: string;
};
