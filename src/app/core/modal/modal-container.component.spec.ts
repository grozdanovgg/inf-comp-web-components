import { ModalSize } from './modal.types';
import { ModalService } from 'src/app/core/modal/modal.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContainerComponent } from './modal-container.component';
import { ComponentRef, Type, ViewContainerRef } from '@angular/core';
import { IModalContentComponent, ModalOptions } from 'src/app/core/modal/modal.types';
import { popupIcons } from 'src/app/core/modal/assets';

describe('ModalContainerComponent', () => {
  let component: ModalContainerComponent,
    fixture: ComponentFixture<ModalContainerComponent>,
    viewContainerRefSpy: jasmine.SpyObj<ViewContainerRef>,
    modalServiceSpy: jasmine.SpyObj<ModalService>,
    componentRef: ComponentRef<IModalContentComponent>;

  beforeEach(async () => {
    componentRef = { instance: {} } as ComponentRef<IModalContentComponent>;
    modalServiceSpy = jasmine.createSpyObj('modalServiceSpy', ['close']);
    viewContainerRefSpy = jasmine.createSpyObj('viewContainerRef', ['clear', 'createComponent']);

    viewContainerRefSpy.createComponent.and.returnValue(componentRef);

    await TestBed.configureTestingModule({
      declarations: [ModalContainerComponent],
      providers: [
        { provide: ModalService, useValue: modalServiceSpy }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component['appModalAnchor']).toBeUndefined();
    expect(component.component).toBeUndefined();
    expect(component.options).toBeUndefined();
    expect(component.index).toBeUndefined();
    expect(component.showCloseIcon).toBeTrue();
    expect(component.backdropClass).toBe('');
    expect(component.icons).toEqual(popupIcons);
    expect(component.size).toBe(ModalSize.s);
  });

  describe('loadContent()', () => {
    let newComponent: Type<any>,
      options: ModalOptions;
    beforeEach(() => {
      newComponent = {
        id: 'foo new component'
      } as unknown as Type<any>;
      options = {
        data: {
          fooData: 'fooDataValue',
        },
        size: ModalSize.m
      };

      component['appModalAnchor'] = { viewContainerRef: viewContainerRefSpy };
    });

    it('clear the containerRef content, create new component and bind the data', () => {
      component.loadContent(newComponent, options);

      expect(viewContainerRefSpy.clear).toHaveBeenCalledOnceWith();
      expect(viewContainerRefSpy.createComponent).toHaveBeenCalledOnceWith(newComponent as any);
      expect(componentRef.instance.data).toEqual(options.data as object);
      expect(component.size).toBe(options.size as ModalSize);
    });
  });

  describe('close()', () => {
    it('call modalService.close()', () => {
      component.index = 55;

      component.close();

      expect(modalServiceSpy.close).toHaveBeenCalledOnceWith(55);
    });
  });
});
