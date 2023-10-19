import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ShipDetailsStatisticsComponent } from 'src/app/core/ship-details-statistics/ship-details-statistics.component';
import { Ship } from 'src/app/model/ship';

describe('ShipDetailsStatisticsComponent', async () => {
  let component: ShipDetailsStatisticsComponent;
  let fixture: ComponentFixture<ShipDetailsStatisticsComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ShipDetailsStatisticsComponent],
      imports: [TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
      })],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipDetailsStatisticsComponent);
    component = fixture.componentInstance;
    component.observe = new Ship({
      NFTAssetID: '0c5d451941f37b801d04c46920f2bc5bbd3986e5f56cb56c6b17bedc655e9fc6',
      ShipID: `PLVRS-CNMK2-1`,
      InstanceID: '',
      SerialNumber: '',
      CategoryName: 'Foo category',
      Force: `Strong force 10}`,
      Class: `Centurion`,
      Images: {
        Top: `https://cdn.infinitefleet.com/pol_carrier_mk2_top.png`,
        Back: `https://cdn.infinitefleet.com/pol_carrier_mk2_back.png`,
        Front: `https://cdn.infinitefleet.com/pol_carrier_mk2_front.png`,
        Bottom: `https://cdn.infinitefleet.com/pol_carrier_mk2_bottom.png`,
      },
      Description: `The Polaris Carrier is a fortified vessel designed to withstand punishment and deploy mech squadrons efficiently into a battle zone. The Carrier boasts several large hangar bays and launch ramps to ensure rapid mech insertion during combat. This mobile fortress is not equipped with significant firepower of its own, but is designed to swarm the enemy from a distance and provide support to turn the tide of battle. Ten point defense coilguns provide efficient protection from enemy missiles and mechs.The USF Carrier is equipped with balanced defensive capabilities between shields and armor, and balanced resistance to both thermal and kinetic-based weaponry. It also houses four onboard mech assembly bays, a modular engineering and production center, onboard mineral refineries, and a standard crew complement of 600 to 700 personnel.`,
      Characteristics: {
        Armor: `6 mm Modular Immutium Plates`,
        Mechs: `Mech Hangars x 10 Mech Assembly Bays x`,
        Shield: ` GWh Shield Capacitor, Maximum GW Recharge`,
        Dimensions: ` m x  m x  m`,
        EnergyProduction: ` m Class E Tokamak Fusion Reactor -  GW Output`,
        WeaponHardpoints: ` Foo WeaponHardpoints?`,
        LocalSensorRange: ` Foo LocalSensorRange?`,
      },
      Strengths: `The Carrier focuses on deploying small fighters en masse to the battlefield and supporting those fighters more effectively than other ships. It can deploy fleets of mechs from relatively safe distances to strike at enemy ships and grind down enemy defenses.`,
      Weaknesses: `Structural weaknesses on port and starboard sides to accommodate hangar bay doors.`,
      Stats: [
        {
          Name: `firepower`,
          Value: 1,
        },
        {
          Name: `range`,
          Value: 2,
        },
        {
          Name: `hull`,
          Value: 3,
        },
        {
          Name: `shields`,
          Value: 4,
        },
        {
          Name: `speed`,
          Value: 5,
        },
        {
          Name: `agility`,
          Value: 6,
        },
      ],
      Abilities: [
        {
          Name: `overload`,
          Image: `https://cdn.infinitefleet.com/overload.svg`,
          Value: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime sit eligendi perspiciatis iusto. Obcaecati, praesentium?`,
        },
        {
          Name: `launch_missiles`,
          Image: `https://cdn.infinitefleet.com/launch_missiles.svg`,
          Value: `Lorem ipsum dolor sit amet`,
        },
      ],
      PendingWithdrawal: false,
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
