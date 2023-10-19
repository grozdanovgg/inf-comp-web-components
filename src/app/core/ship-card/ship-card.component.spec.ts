import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ship } from 'src/app/model/ship';
import { WarehouseService } from 'src/app/warehouse/warehouse.service';

import { ShipCardComponent } from './ship-card.component';

describe('ShipCardComponent', () => {
  let component: ShipCardComponent;
  let fixture: ComponentFixture<ShipCardComponent>;
  let changeDetectorRef: jasmine.SpyObj<ChangeDetectorRef>;
  let warehouseService: jasmine.SpyObj<WarehouseService>;

  beforeEach(async () => {
    const changeDetectorRefSpy = jasmine.createSpyObj('changeDetectorRefSpy', ['detectChanges']);
    warehouseService = jasmine.createSpyObj('warehouseService', ['getState']);

    warehouseService.getState.and.returnValue({
      browserEnv: true
    });

    await TestBed.configureTestingModule({
      declarations: [ShipCardComponent],
      providers: [
        { provide: ChangeDetectorRef, useValue: changeDetectorRefSpy },
        { provide: WarehouseService, useValue: warehouseService }
      ]
    }).compileComponents();

    changeDetectorRef = TestBed.inject(ChangeDetectorRef) as jasmine.SpyObj<ChangeDetectorRef>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.browserEnv).toBeTrue();
    expect(warehouseService.getState).toHaveBeenCalledOnceWith();
  });

  describe('updateSelector()', () => {
    let event: Event;
    let type: 'Front' | 'Back' | 'Top' | 'Bottom';

    beforeEach(() => {
      event = jasmine.createSpyObj<Event>('event', ['preventDefault']);
      type = 'Front';
    });

    it('should call e.preventDefault()', () => {
      component.updateSelector(event, type);

      expect(event.preventDefault).toHaveBeenCalledOnceWith();
    });

    it('should set some state properties', () => {
      component.updateSelector(event, type);

      expect(component.inSelectedIconView).toBeTrue();
      expect(component.currentIconPath[0]).toEqual(jasmine.any(String));
      expect(component.selectedImage).toBe(type);
    });
  });

  describe('setAnimationClasses()', () => {
    it('should return a config animation object based on index input 0', () => {
      const result = component.setAnimationClasses(0);
      const expected = {
        'fade-in': true,
        'fade-in-50ms': false,
        'fade-in-100ms': false,
        'fade-in-150ms': false
      };

      expect(result).toEqual(expected);
    });

    it('should return a config animation object based on index input 1', () => {
      const result = component.setAnimationClasses(1);
      const expected = {
        'fade-in': false,
        'fade-in-50ms': true,
        'fade-in-100ms': false,
        'fade-in-150ms': false
      };

      expect(result).toEqual(expected);
    });

    it('should return a config animation object based on index input 2', () => {
      const result = component.setAnimationClasses(2);
      const expected = {
        'fade-in': false,
        'fade-in-50ms': false,
        'fade-in-100ms': true,
        'fade-in-150ms': false
      };

      expect(result).toEqual(expected);
    });


    it('should return a config animation object based on index input 3', () => {
      const result = component.setAnimationClasses(3);
      const expected = {
        'fade-in': false,
        'fade-in-50ms': false,
        'fade-in-100ms': false,
        'fade-in-150ms': true
      };

      expect(result).toEqual(expected);
    });


    it('should return a config animation object based on index input 4', () => {
      const result = component.setAnimationClasses(4);
      const expected = {
        'fade-in': false,
        'fade-in-50ms': false,
        'fade-in-100ms': false,
        'fade-in-150ms': false
      };

      expect(result).toEqual(expected);
    });
  });

  describe('openFullscreen()', () => {
    let event: jasmine.SpyObj<Event>;

    beforeEach(() => {
      event = jasmine.createSpyObj('event', [
        'stopPropagation',
        'preventDefault',
      ]);
      component.ship = new Ship({ Images: [] } as unknown as Ship);
      spyOn(component, 'handleZoomInOut' as never);
    });

    it('should stopPropagation and preventDefault', () => {
      component.openFullscreen(event);
      expect(event.stopPropagation).toHaveBeenCalledOnceWith();
      expect(event.preventDefault).toHaveBeenCalledOnceWith();
    });

    it('should create photoswipe and initiate it', () => {
      component.ship.PendingWithdrawal = false;

      component.openFullscreen(event);
      
      expect(component['handleZoomInOut']).toHaveBeenCalledOnceWith(jasmine.any(Object));
    });

    it('should not create photoswipe and initiate it if there is pending withdraw on the ship', () => {
      component.ship.PendingWithdrawal = true;

      component.openFullscreen(event);

      expect(component['handleZoomInOut']).not.toHaveBeenCalled();
    });
  });

  describe('handleZoomInOut()', () => {
    it('handle zooming', () => {
      const gallery = jasmine.createSpyObj('gallery', ['on']);

      // @ts-ignore
      component.handleZoomInOut(gallery);

      expect(gallery.on).toHaveBeenCalledTimes(3);
      expect(gallery.on).toHaveBeenCalledWith('pointerDown', jasmine.any(Function));
      expect(gallery.on).toHaveBeenCalledWith('pointerUp', jasmine.any(Function));
      expect(gallery.on).toHaveBeenCalledWith('pointerMove', jasmine.any(Function));
    });
  });
});
