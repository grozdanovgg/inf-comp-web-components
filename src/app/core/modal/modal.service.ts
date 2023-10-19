import { BaseWebComponentService } from 'src/app/warehouse/base-web-component.service';
import { ConfirmModalOptions, InfoModalOptions, ModalControl, ModalResponse, ModalSize, NotificationModalOptions } from './modal.types';
import { ConfirmComponent } from './confirm/confirm.component';
import { ComponentRef, Injectable, Type, Renderer2, RendererFactory2 } from '@angular/core';
import { ModalContainerComponent } from 'src/app/core/modal/modal-container.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationComponent } from 'src/app/core/modal/notification/notification.component';
import { ModalOptions } from 'src/app/core/modal/modal.types';
import { InformationComponent } from 'src/app/core/modal/information/information.component';
import { DomService } from 'src/app/core/dom-service.service';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalsContainer?: HTMLElement;
  private modalControlMap: Map<number, ModalControl> = new Map();
  private renderer2: Renderer2;

  constructor(private domService: DomService,
    private baseWebComponentService: BaseWebComponentService,
    rendererFactory: RendererFactory2) {

    this.renderer2 = rendererFactory.createRenderer(null, null);
  }

  openNotificationModal({
    title,
    content,
    buttonText,
    size = ModalSize.m,
    backdropClass = 'backdrop-blur',
    showCloseIcon = true }: NotificationModalOptions = {}): Observable<ModalResponse> {

    return this.openModal(NotificationComponent, {
      size,
      data: { title, content, buttonText },
      backdropClass,
      showCloseIcon
    });
  }

  openConfirmModal({
    title,
    content,
    okButtonText,
    cancelButtonText,
    size = ModalSize.m,
    backdropClass = 'backdrop-blur',
    showCloseIcon = true }: ConfirmModalOptions = {}): Observable<ModalResponse> {

    return this.openModal(ConfirmComponent, {
      size,
      data: { title, content, okButtonText, cancelButtonText },
      backdropClass,
      showCloseIcon
    });
  }

  openInfoModal({
    title,
    sections,
    size = ModalSize.l,
    backdropClass = 'backdrop-blur',
    showCloseIcon = true }: InfoModalOptions = {}): Observable<ModalResponse> {

    return this.openModal(InformationComponent, {
      size,
      data: { title, sections },
      backdropClass,
      showCloseIcon
    });
  }

  openFullscreenComponent(
    component: Type<any>,
    data?: object
  ): Observable<ModalResponse> {
    return this.openModal(component, {
      data,
      size: ModalSize.fullscreen
    });
  }

  close(index: number, data?: object) {
    const modalControl = this.modalControlMap.get(index);
    modalControl?.componentRef.destroy();
    modalControl?.observer.next({ action: 'close', data });
    modalControl?.observer.complete();

    this.modalControlMap.delete(index);
  }

  destroyModalContainer(): void {
    this.modalsContainer = undefined;
  }

  private openModal(
    component: Type<any>,
    options: ModalOptions = {}
  ): Observable<ModalResponse> {
    this.prepareModalsContainer();

    const index = this.modalControlMap.size;
    const newModalContainer: ComponentRef<ModalContainerComponent> =
      this.domService.createComponent(
        ModalContainerComponent
      ) as ComponentRef<ModalContainerComponent>;
    const observer: BehaviorSubject<ModalResponse> = new BehaviorSubject({
      action: 'open',
    });

    newModalContainer.instance.component = component;
    newModalContainer.instance.options = options;
    newModalContainer.instance.index = index;
    newModalContainer.instance.loadContent(component, options);

    this.modalControlMap.set(index, {
      index,
      componentRef: newModalContainer,
      observer,
    });

    this.domService.attachComponent(
      newModalContainer,
      this.modalsContainer as HTMLElement
    );

    return observer.asObservable();
  }

  private prepareModalsContainer() {
    if (!this.modalsContainer) {
      const modalContainer = this.renderer2.createElement('div');

      this.renderer2.appendChild(this.baseWebComponentService.rootElement, modalContainer);
      this.modalsContainer = modalContainer;
    }
  }
}
