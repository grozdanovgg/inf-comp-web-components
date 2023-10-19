import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { IonicModule } from '@ionic/angular';
import { ShipDetailsGeneralRegistryComponent } from 'src/app/registry/ship-details-general-registry/ship-details-general-registry.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShipCardModule } from 'src/app/core/ship-card/ship-card.module';
import { RegistryComponent } from './registry.component';
import { ShipDetailsStatisticsModule } from 'src/app/core/ship-details-statistics/ship-details-statistics.module';
import { ShipDetailsTechModule } from 'src/app/core/ship-details-tech/ship-details-tech.module';
@NgModule({
  declarations: [
    RegistryComponent,
    ShipDetailsGeneralRegistryComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatTabsModule,
    IonicModule,
    ShipDetailsStatisticsModule,
    ShipDetailsTechModule,
    ShipCardModule
  ]
})
export class RegistryModule { }
