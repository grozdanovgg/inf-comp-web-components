import { NgModule } from '@angular/core';
import { ShipDepositComponent } from 'src/app/ship-deposit/ship-deposit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    ShipDepositComponent
  ],
  imports: [
    SharedModule,
    IonicModule,
    MatProgressSpinnerModule
  ]
})
export class ShipDepositModule { }
