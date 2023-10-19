import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm/confirm.component';
import { NotificationComponent } from './notification/notification.component';
import { TranslateModule } from '@ngx-translate/core';
import { ModalContentDirective } from './modal-content.directive';
import { ModalContainerComponent } from './modal-container.component';
import { InformationComponent } from './information/information.component';

@NgModule({
  declarations: [
    ConfirmComponent,
    NotificationComponent,
    InformationComponent,
    ModalContentDirective,
    ModalContainerComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports:[
    ModalContainerComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ModalModule { }
