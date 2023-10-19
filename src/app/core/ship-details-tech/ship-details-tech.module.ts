import { NgModule } from '@angular/core';
import { ShipDetailsTechComponent } from 'src/app/core/ship-details-tech/ship-details-tech.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ShipDetailsTechComponent],
  imports: [
    SharedModule
  ],
  exports: [
    ShipDetailsTechComponent
  ]
})
export class ShipDetailsTechModule { }
