import { ModalContentDirective } from './modal-content.directive';
import { Component, ViewChild, Type, Input } from '@angular/core';
import { ModalService } from 'src/app/core/modal/modal.service';
import {
  ModalSize,
  IModalContentComponent,
  ModalOptions,
} from 'src/app/core/modal/modal.types';
import { popupIcons } from './assets';
@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss'],
})
export class ModalContainerComponent {
  @ViewChild(ModalContentDirective, { static: true })
  private appModalAnchor!: ModalContentDirective;

  @Input() component!: Type<any>;
  @Input() options!: ModalOptions;
  @Input() index!: number;

  showCloseIcon = true;
  backdropClass: string = '';
  icons = popupIcons;
  size: ModalSize = ModalSize.s;

  constructor(private modalService: ModalService) {}

  loadContent(component: Type<any>, options: ModalOptions = {}) {
    const viewContainerRef = this.appModalAnchor.viewContainerRef;
    viewContainerRef.clear();

    const componentRef =
      viewContainerRef.createComponent<IModalContentComponent>(component);
    componentRef.instance.data = options.data || {};
    componentRef.instance.closeModal = this.close.bind(this);

    this.backdropClass = options.backdropClass || '';
    this.showCloseIcon = options.showCloseIcon || false;
    this.size = options.size || ModalSize.s;
  }

  close() {
    this.modalService.close(this.index);
  }
}
