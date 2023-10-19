import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { SplitWordsPipe } from 'src/app/shared/pipes/split-words.pipe';
import { WebComponentsModule } from 'src/app/shared/web-components.module';
import { ModalModule } from '../core/modal/modal.module';
import { InfBalancePipe } from './pipes/inf-balance.pipe';

@NgModule({
  declarations: [
    SplitWordsPipe,
    InfBalancePipe
  ],
  imports: [
    CommonModule,
    WebComponentsModule,
    TranslateModule,
    ModalModule,
    BrowserAnimationsModule,
  ],
  exports: [
    CommonModule,
    WebComponentsModule,
    TranslateModule,
    ModalModule,
    SplitWordsPipe,
    InfBalancePipe
  ],
})
export class SharedModule {}
