import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShipDetailsGeneralWarehouseComponent } from 'src/app/warehouse/ship-details-general-warehouse/ship-details-general-warehouse.component';
import { WarehouseRoutingModule } from 'src/app/warehouse/warehouse-routing.module';
import { WarehouseComponent } from 'src/app/warehouse/warehouse.component';

import { HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import 'hammerjs';
import { SliderModule } from 'src/app/warehouse/slider/slider.module';
import { ShipDetailsStatisticsModule } from 'src/app/core/ship-details-statistics/ship-details-statistics.module';
import { WarehouseRoutingComponent } from 'src/app/warehouse/warehouse-routing.component';
import { ShipDetailsTechModule } from 'src/app/core/ship-details-tech/ship-details-tech.module';

@NgModule({
  declarations: [
    WarehouseComponent,
    WarehouseRoutingComponent,
    ShipDetailsGeneralWarehouseComponent
  ],
  imports: [
    SharedModule,
    WarehouseRoutingModule,
    SliderModule,
    MatTabsModule,
    IonicModule,
    HammerModule,
    ShipDetailsStatisticsModule,
    ShipDetailsTechModule
  ],
  exports: [],
  providers: [{
    provide: HAMMER_GESTURE_CONFIG,
    useClass: HammerGestureConfig
  }]
})
export class WarehouseModule { }
