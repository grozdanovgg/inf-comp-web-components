import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncLoadingImgComponent } from 'src/app/core/async-loading-img/async-loading-img.component';

@NgModule({
  declarations: [AsyncLoadingImgComponent],
  imports: [
    CommonModule
  ],
  exports: [AsyncLoadingImgComponent]
})
export class AsyncLoadingImgModule { }
