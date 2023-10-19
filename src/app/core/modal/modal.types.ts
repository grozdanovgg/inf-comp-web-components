import { ComponentRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalContainerComponent } from 'src/app/core/modal/modal-container.component';

export interface IModalContentComponent {
  data: object;

  closeModal(): void;
}

export enum ModalSize {
  s = 's',
  m = 'm',
  l = 'l',
  fullscreen = 'fullscreen'
};

export type ModalOptions = {
  data?: object;
  size?: ModalSize;
  showCloseIcon?: boolean;
  backdropClass?: string;
};

export type ModalResponse = {
  action: string;
  data?: object;
};

export type ModalControl = {

  index: number,
  observer: BehaviorSubject<ModalResponse>,
  componentRef: ComponentRef<ModalContainerComponent>;
};

export type ConfirmModalOptions = {
  title?: string;
  content?: string;
  okButtonText?: string;
  cancelButtonText?: string;
  size?: ModalSize;
  backdropClass?: string;
  showCloseIcon?: boolean;
};

export type InfoModalOptions = {
  title?: string;
  sections?: InfoModalSection[];
  size?: ModalSize;
  backdropClass?: string;
  showCloseIcon?: boolean;
};

export type InfoModalSection = {
  subTitle: string;
  text: string[];
};

export type NotificationModalOptions = {
  title?: string;
  content?: string;
  buttonText?: string;
  size?: ModalSize;
  backdropClass?: string;
  showCloseIcon?: boolean;
};
