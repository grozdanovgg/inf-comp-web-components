import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { Ship } from 'src/app/model/ship';

@Component({
  selector: 'app-component',
  templateUrl: './app-component.component.html',
  styleUrls: ['./app-component.component.scss'],
  providers: []
})
export class AppComponentComponent implements OnInit {
  @ViewChild('webComponentContainer', { static: true }) webComponentContainer!: ElementRef;

  mockShips: Ship[] = [];
  activeNode: any;
  shipID = '01010202010006';

  constructor(private renderer2: Renderer2) { }

  ngOnInit(): void {
    this.toggleActiveComponent('inf-wcomp-warehouse');
  }

  toggleActiveComponent(component: string): void {
    if (component === 'inf-wcomp-warehouse') {
      this.renderWarehouseComponent();
    } else if (component === 'inf-wcomp-ship-withdraw') {
      this.renderShipWithdrawComponent();
    } else if (component === 'inf-wcomp-registry') {
      this.renderRegistryComponent();
    } else if (component === 'inf-wcomp-ship-deposit') {
      this.renderShipDepositComponent();
    } else {
      console.warn('No valid configuration for rendering component: ', component);
    }
  }

  private renderWarehouseComponent(): void {
    this.createWebComponentElement('inf-wcomp-warehouse');

    const mockedShips = this.getMockShips(10);

    this.renderer2.setProperty(this.activeNode, 'ships', mockedShips);
    this.renderer2.setProperty(this.activeNode, 'disableNFTDepositBtn', false);
    this.renderer2.setProperty(this.activeNode, 'disableWithdrawNFTBtn', false);
    this.renderer2.setProperty(this.activeNode, 'hasWallet', true);
    this.renderer2.setProperty(this.activeNode, 'infBalance', '1437100');
    this.renderer2.setProperty(this.activeNode, 'browserEnv', false);
    this.renderer2.setProperty(this.activeNode, 'language', 'en');
    this.renderer2.setProperty(this.activeNode, 'get', () => {
      console.log('CALLED get');
      return of({});
    });
    this.renderer2.setProperty(this.activeNode, 'post', () => {
      console.log('CALLED post');
      return of({});
    });
    this.renderer2.setProperty(this.activeNode, 'put', () => {
      console.log('CALLED put');
      return of({});
    });
    this.renderer2.listen(this.activeNode, 'navigateToContextRoute', () => console.log('Fake externar route called'));
    this.renderer2.listen(this.activeNode, 'transferShipToWallet', (ship: CustomEvent<Ship>) => console.log('Fake transferShipToWallet', ship.detail.SerialNumber));
    this.renderer2.listen(this.activeNode, 'transferShipToGame', (ship: CustomEvent<Ship>) => console.log('Fake transferShipToGame', ship.detail.SerialNumber));

    this.renderer2.appendChild(this.webComponentContainer.nativeElement, this.activeNode);
  }

  private renderShipDepositComponent(): void {
    this.createWebComponentElement('inf-wcomp-ship-deposit');

    const mockedShip = this.getMockShips(1)[0];

    this.renderer2.setProperty(this.activeNode, 'walletAddress', 'asdfh2234832457');
    this.renderer2.setProperty(this.activeNode, 'language', 'en');
    this.renderer2.setProperty(this.activeNode, 'get', () => {
      console.log('CALLED get');
      return of({});
    });
    this.renderer2.setProperty(this.activeNode, 'post', () => {
      console.log('CALLED post');
      return of({});
    });
    this.renderer2.setProperty(this.activeNode, 'put', () => {
      console.log('CALLED put');
      return of({});
    });
    this.renderer2.listen(this.activeNode, 'navigateToContextRoute', () => {
      console.log('Fake navigateToContextRoute route called');
    });
    this.renderer2.listen(this.activeNode, 'navigateToWarehouse', () => {
      console.log('Fake navigateToWarehouse route called');
    });

    this.renderer2.appendChild(this.webComponentContainer.nativeElement, this.activeNode);

  }

  private renderShipWithdrawComponent(): void {
    this.createWebComponentElement('inf-wcomp-ship-withdraw');

    const mockedShip = this.getMockShips(1)[0];

    this.renderer2.setProperty(this.activeNode, 'ship', mockedShip);
    this.renderer2.setProperty(this.activeNode, 'browserEnv', false);
    this.renderer2.setProperty(this.activeNode, 'language', 'en');
    this.renderer2.listen(this.activeNode, 'navigateToContextRoute', () => {
      console.log('Fake externar route called');
    });
    this.renderer2.setProperty(this.activeNode, 'get', () => {
      console.log('CALLED get');
      return of({});
    });
    this.renderer2.setProperty(this.activeNode, 'post', () => {
      console.log('CALLED post');
      return of({});
    });
    this.renderer2.setProperty(this.activeNode, 'put', () => {
      console.log('CALLED put');
      return of({});
    });

    this.renderer2.appendChild(this.webComponentContainer.nativeElement, this.activeNode);
  }

  private renderRegistryComponent(): void {
    this.createWebComponentElement('inf-wcomp-registry');

    let mockedShip = this.getMockShips(1)[0];
    mockedShip.InstanceID = '';
    mockedShip = new Ship(mockedShip);

    this.renderer2.setProperty(this.activeNode, 'ship', mockedShip);
    this.renderer2.setProperty(this.activeNode, 'language', 'en');
    this.renderer2.listen(this.activeNode, 'navigateToContextRoute', () => {
      console.log('Fake externar route called');
    });
    this.renderer2.setProperty(this.activeNode, 'get', () => {
      console.log('CALLED get');
      return of({});
    });
    this.renderer2.setProperty(this.activeNode, 'post', () => {
      console.log('CALLED post');
      return of({});
    });
    this.renderer2.setProperty(this.activeNode, 'put', () => {
      console.log('CALLED put');
      return of({});
    });

    this.renderer2.appendChild(this.webComponentContainer.nativeElement, this.activeNode);
  }

  private createWebComponentElement(customElement: string): void {
    this.activeNode && this.renderer2.removeChild(this.webComponentContainer.nativeElement, this.activeNode, false);
    this.activeNode = this.renderer2.createElement(customElement);
  }

  private getMockShips(count: number): Ship[] {
    return Array.from(Array(count).keys())
      .map((value, index) => {
        index++;

        return new Ship({
          NFTAssetID: '0c5d451941f37b801d04c46920f2bc5bbd3986e5f56cb56c6b17bedc655e9fc6',
          ShipID: "0101020201000" + index,
          SerialNumber: '',
          InstanceID: '0000000' + index,
          CategoryName: 'Foo category',
          Force: `Strong force ${index * 10}`,
          Class: `Centurion`,
          Images: {
            Top: `https://cdn.infinitefleet.com/pol_carrier_mk2_top.png`,
            Back: `https://cdn.infinitefleet.com/pol_carrier_mk2_back.png`,
            Front: `https://cdn.infinitefleet.com/pol_carrier_mk2_front.png`,
            Bottom: `https://cdn.infinitefleet.com/pol_carrier_mk2_bottom.png`
          },
          Description: `The ${index + 1} Polaris Carrier is a fortified vessel designed to withstand punishment and deploy mech squadrons efficiently into a battle zone. The Carrier boasts several large hangar bays and launch ramps to ensure rapid mech insertion during combat. This mobile fortress is not equipped with significant firepower of its own, but is designed to swarm the enemy from a distance and provide support to turn the tide of battle. Ten point defense coilguns provide efficient protection from enemy missiles and mechs.The USF Carrier is equipped with balanced defensive capabilities between shields and armor, and balanced resistance to both thermal and kinetic-based weaponry. It also houses four onboard mech assembly bays, a modular engineering and production center, onboard mineral refineries, and a standard crew complement of 600 to 700 personnel.`,
          Characteristics: {
            Armor: `6${index * 10} mm Modular Immutium Plates`,
            Mechs: `Mech Hangars x ${index * 2}, Mech Assembly Bays x ${index * 2}`,
            Shield: `${index * 20} GWh Shield Capacitor, Maximum ${index * 15} GW Recharge`,
            Dimensions: `${index * 100} m x ${index * 40} m x ${index * 20} m`,
            EnergyProduction: `${index * 20} m Class E Tokamak Fusion Reactor - ${index * 50} GW Output`,
            WeaponHardpoints: `${index * 2} Foo WeaponHardpoints?`,
            LocalSensorRange: `${index * 2} Foo LocalSensorRange?`
          },
          Strengths: `The Carrier ${index * 2} focuses on deploying small fighters en masse to the battlefield and supporting those fighters more effectively than other ships. It can deploy fleets of mechs from relatively safe distances to strike at enemy ships and grind down enemy defenses.`,
          Weaknesses: `${index * 2} Structural weaknesses on port and starboard sides to accommodate hangar bay doors.`,
          Stats: [{
            Name: `firepower`,
            Value: index
          }, {
            Name: `range`,
            Value: index * 2
          }, {
            Name: `hull`,
            Value: index * 3
          }, {
            Name: `shields`,
            Value: index * 4
          }, {
            Name: `speed`,
            Value: index * 5
          }, {
            Name: `agility`,
            Value: index * 6
          }],
          Abilities: [{
            Name: `overload`,
            Image: `https://cdn.infinitefleet.com/overload.svg`,
            Value: `${index}Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime sit eligendi perspiciatis iusto. Obcaecati, praesentium?`
          }, {
            Name: `launch_missiles`,
            Image: `https://cdn.infinitefleet.com/launch_missiles.svg`,
            Value: `${index}Lorem ipsum dolor sit amet`
          }],
          PendingWithdrawal: (index % 2) === 0
        });
      });

  }
}
