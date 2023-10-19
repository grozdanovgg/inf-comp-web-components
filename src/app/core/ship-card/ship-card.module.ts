import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipCardComponent } from 'src/app/core/ship-card/ship-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { AsyncLoadingImgModule } from 'src/app/core/async-loading-img/async-loading-img.module';

@NgModule({
  declarations: [
    ShipCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    IonicModule,
    AsyncLoadingImgModule
  ],
  exports: [
    ShipCardComponent
  ]
})
export class ShipCardModule { }
