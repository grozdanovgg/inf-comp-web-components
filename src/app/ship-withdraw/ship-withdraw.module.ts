import { NgModule } from '@angular/core';
import { ShipWithdrawComponent } from 'src/app/ship-withdraw/ship-withdraw.component';
import { ShipCardModule } from 'src/app/core/ship-card/ship-card.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    ShipWithdrawComponent
  ],
  imports: [
    SharedModule,
    ShipCardModule,
    IonicModule
  ]
})
export class ShipWithdrawModule { }
