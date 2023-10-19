import {
  ModalControl,
  ModalOptions,
  ModalResponse,
  ModalSize,
} from './modal.types';
import { TestBed } from '@angular/core/testing';
import { ModalService } from './modal.service';
import { ComponentRef, RendererFactory2, Type } from '@angular/core';
import { ModalContainerComponent } from 'src/app/core/modal/modal-container.component';
import { BehaviorSubject } from 'rxjs';
import { DomService } from 'src/app/core/dom-service.service';

describe('ModalService', () => {
  let service: ModalService;
  let domServiceSpy: jasmine.SpyObj<DomService>;
  let rendererFactorySpy: jasmine.SpyObj<RendererFactory2>;

  beforeEach(() => {
    domServiceSpy = jasmine.createSpyObj('domService', [
      'createComponent',
      'attachComponent',
    ]);
    rendererFactorySpy = jasmine.createSpyObj('domService', ['createRenderer']);

    rendererFactorySpy.createRenderer.and.callThrough();

    TestBed.configureTestingModule({
      providers: [
        { provide: DomService, useValue: domServiceSpy },
        { provide: RendererFactory2, useValue: rendererFactorySpy }
      ],
    });
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service['modalsContainer']).toBeUndefined();
    expect(service['modalControlMap']).toEqual(new Map());
    expect(rendererFactorySpy.createRenderer).toHaveBeenCalledOnceWith(null, null);
  });

  describe('openNotificationModal()', () => {
    beforeEach(() => {
      // @ts-ignore
      spyOn(service, 'openModal');
    });

    it('should call openModal with the default options', () => {
      service.openNotificationModal();

      expect(service['openModal']).toHaveBeenCalledOnceWith(jasmine.any(Function), {
        size: ModalSize.m,
        data: { title: undefined, content: undefined, buttonText: undefined },
        backdropClass: 'backdrop-blur',
        showCloseIcon: true,
      });
    });

    it('should call openModal with the provided options', () => {
      const options = {
        title: 'title',
        content: 'content',
        buttonText: 'button',
        size: ModalSize.l
      };

      service.openNotificationModal(options);

      expect(service['openModal']).toHaveBeenCalledOnceWith(jasmine.any(Function), {
        size: ModalSize.l,
        data: { title: 'title', content: 'content', buttonText: 'button' },
        backdropClass: 'backdrop-blur',
        showCloseIcon: true,
      });
    });
  });

  describe('openConfirmModal()', () => {
    beforeEach(() => {
      // @ts-ignore
      spyOn(service, 'openModal');
    });

    it('should call openModal with the default options', () => {
      service.openConfirmModal();

      expect(service['openModal']).toHaveBeenCalledOnceWith(jasmine.any(Function), {
        size: ModalSize.m,
        data: { title: undefined, content: undefined, okButtonText: undefined, cancelButtonText: undefined },
        backdropClass: 'backdrop-blur',
        showCloseIcon: true,
      });
    });

    it('should call openModal with the provided options', () => {
      const options = {
        title: 'title',
        content: 'content',
        okButtonText: 'okButton',
        cancelButtonText: 'cancelButton',
        size: ModalSize.l
      };

      service.openConfirmModal(options);

      expect(service['openModal']).toHaveBeenCalledOnceWith(jasmine.any(Function), {
        size: ModalSize.l,
        data: { title: 'title', content: 'content', okButtonText: 'okButton', cancelButtonText: 'cancelButton' },
        backdropClass: 'backdrop-blur',
        showCloseIcon: true,
      });
    });
  });

  describe('openInfoModal()', () => {
    beforeEach(() => {
      // @ts-ignore
      spyOn(service, 'openModal');
    });

    it('should call openModal with the default options', () => {
      service.openInfoModal();

      expect(service['openModal']).toHaveBeenCalledOnceWith(jasmine.any(Function), {
        size: ModalSize.l,
        data: { title: undefined, sections: undefined },
        backdropClass: 'backdrop-blur',
        showCloseIcon: true,
      });
    });

    it('should call openModal with the provided options', () => {
      const options = {
        title: 'title',
        sections: [
          { subTitle: 'foo-section-1', text: ['text-1', 'text-2'] },
          { subTitle: 'foo-section-2', text: ['text-11', 'text-22'] }
        ],
        size: ModalSize.m
      };

      service.openInfoModal(options);

      expect(service['openModal']).toHaveBeenCalledOnceWith(jasmine.any(Function), {
        size: ModalSize.m,
        data: { title: options.title, sections: options.sections },
        backdropClass: 'backdrop-blur',
        showCloseIcon: true,
      });
    });
  });

  describe('openFullscreenComponent()', () => {
    beforeEach(() => {
      // @ts-ignore
      spyOn(service, 'openModal');
    });

    it('should call openModal with the provided options', () => {
      const component: Type<any> = {
        id: 'fooComponent',
      } as unknown as Type<any>;
      const data = { fooData: 'fooValue' };

      service.openFullscreenComponent(component, data);

      expect(service['openModal']).toHaveBeenCalledOnceWith(component, {
        size: ModalSize.fullscreen,
        data
      });
    });
  });

  describe('close()', () => {
    let index: number,
      data: object,
      modalControl: ModalControl,
      componentRefSpy: jasmine.SpyObj<ComponentRef<ModalContainerComponent>>,
      observerSpy: jasmine.SpyObj<BehaviorSubject<ModalResponse>>;

    beforeEach(() => {
      componentRefSpy = jasmine.createSpyObj('componentRef', ['destroy']);
      observerSpy = jasmine.createSpyObj('observer', ['next', 'complete']);

      index = 55;
      data = { fooData: 'fooValue' };

      modalControl = {
        componentRef: componentRefSpy,
        observer: observerSpy,
      } as unknown as ModalControl;

      service['modalControlMap'] = new Map([[55, modalControl]]) as Map<
        number,
        ModalControl
      >;
    });

    it('should destroy the component, send the close event and delete it from modalControlMap', () => {
      service.close(index, data);

      expect(componentRefSpy.destroy).toHaveBeenCalledOnceWith();
      expect(observerSpy.next).toHaveBeenCalledOnceWith({
        action: 'close',
        data,
      });
      expect(observerSpy.complete).toHaveBeenCalledOnceWith();
      expect(service['modalControlMap'].size).toBe(0);
    });
  });

  describe('openModal()', () => {
    let component: Type<any>,
      options: ModalOptions,
      newModalContainer: ComponentRef<ModalContainerComponent>,
      loadContentSpy: jasmine.Spy;

    beforeEach(() => {
      loadContentSpy = jasmine.createSpy('loadContent');

      component = {} as Type<any>;
      options = {};
      newModalContainer = {
        instance: {
          loadContent: loadContentSpy,
        },
      } as unknown as ComponentRef<ModalContainerComponent>;

      service['modalControlMap'] = new Map([[0, {}]]) as Map<
        number,
        ModalControl
      >;

      // @ts-ignore
      spyOn(service, 'prepareModalsContainer');

      domServiceSpy.createComponent.and.returnValue(newModalContainer);
    });

    it('should call prepareModalsContainer', () => {
      service['openModal'](component, options);

      expect(service['prepareModalsContainer']).toHaveBeenCalledOnceWith();
    });

    it('should create the newModalContainer, set its properties, load the content, add it to the modalControlMap and call domService.attachComponent()', () => {
      const fooModalsContainer: HTMLElement = {
        id: 'foo modals container',
      } as HTMLElement;
      service['modalsContainer'] = fooModalsContainer;

      service['openModal'](component, options);

      expect(domServiceSpy.createComponent).toHaveBeenCalledOnceWith(
        ModalContainerComponent
      );
      expect(newModalContainer.instance.component).toBe(component);
      expect(newModalContainer.instance.options).toBe(options);
      expect(newModalContainer.instance.index).toBe(1);
      expect(loadContentSpy).toHaveBeenCalledOnceWith(component, options);
      expect(service['modalControlMap'].size).toBe(2);
      expect(service['modalControlMap'].get(1)).toEqual({
        index: 1,
        componentRef: newModalContainer,
        observer: new BehaviorSubject({ action: 'open' }),
      });
      expect(domServiceSpy.attachComponent).toHaveBeenCalledOnceWith(
        newModalContainer,
        fooModalsContainer
      );
    });
  });
});
