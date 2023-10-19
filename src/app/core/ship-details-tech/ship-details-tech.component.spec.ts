import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ShipDetailsTechComponent } from 'src/app/core/ship-details-tech/ship-details-tech.component';
import { Ship } from 'src/app/model/ship';
import { SplitWordsPipe } from 'src/app/shared/pipes/split-words.pipe';

describe('ShipDetailsTechComponent', () => {
  let component: ShipDetailsTechComponent;
  let fixture: ComponentFixture<ShipDetailsTechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        })
      ],
      declarations: [ShipDetailsTechComponent, SplitWordsPipe]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipDetailsTechComponent);
    component = fixture.componentInstance;
    let index = 0;
    component.ship = new Ship({
      NFTAssetID: (index % 2) === 0 ? '0c5d451941f37b801d04c46920f2bc5bbd3986e5f56cb56c6b17bedc655e9fc6' : undefined,
      ShipID: "010102020100060000001",
      SerialNumber: '',
      InstanceID: '',
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

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
