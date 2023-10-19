import { NgModule } from '@angular/core';
import { SliderComponent } from 'src/app/warehouse/slider/slider.component';
import { SwiperModule } from 'swiper/angular';
import { ShipCardModule } from 'src/app/core/ship-card/ship-card.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResizeObserverModule } from '@ng-web-apis/resize-observer';

@NgModule({
  declarations: [
    SliderComponent
  ],
  imports: [
    SharedModule,
    ResizeObserverModule,
    SwiperModule,
    ShipCardModule
  ],
  exports: [
    SliderComponent
  ]
})
export class SliderModule { }
