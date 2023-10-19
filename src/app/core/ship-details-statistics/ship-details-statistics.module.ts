import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { ShipDetailsStatisticsComponent } from 'src/app/core/ship-details-statistics/ship-details-statistics.component';

@NgModule({
  declarations: [ShipDetailsStatisticsComponent],
  imports: [
    SharedModule,
    IonicModule
  ],
  exports: [
    ShipDetailsStatisticsComponent
  ]
})
export class ShipDetailsStatisticsModule { }
