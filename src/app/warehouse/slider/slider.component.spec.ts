import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Ship } from 'src/app/model/ship';
import Swiper from 'swiper';

import { SliderComponent } from './slider.component';

const shipsMock = Array.from(Array(10).keys()).map((value, index) => {
  return new Ship({
    NFTAssetID:
      index % 2 === 0
        ? '0c5d451941f37b801d04c46920f2bc5bbd3986e5f56cb56c6b17bedc655e9fc6'
        : undefined,
    ShipID: `Polaris hammer mk${index + 1}`,
    SerialNumber: '',
    InstanceID: '',
    CategoryName: 'Foo category',
    Force: `Strong force${index * 10}`,
    Class: `Centurion class$`,
    Images: {
      Top: '',
      Bottom: '',
      Front: 'assets/images/polaris_hammer_mk6.png',
      Back: '',
    },
    Description: '',
    Characteristics: {
      Armor: '',
      Mechs: '',
      Shield: '',
      Dimensions: '',
      EnergyProduction: '',
      WeaponHardpoints: '',
      LocalSensorRange: '',
    },
    Strengths: '',
    Weaknesses: '',
    Stats: [],
    Abilities: [],
    PendingWithdrawal: false,
  });
});

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;
  let translate: jasmine.SpyObj<any>;
  let onLangChangeSpy: jasmine.SpyObj<EventEmitter<LangChangeEvent>>;

  beforeEach(async () => {
    onLangChangeSpy = jasmine.createSpyObj('onLangChangeSpy', ['subscribe']);
    translate = jasmine.createSpyObj<TranslateService>('translate', [
      'instant',
    ]);
    translate.onLangChange = onLangChangeSpy;

    await TestBed.configureTestingModule({
      declarations: [SliderComponent],
      providers: [{ provide: TranslateService, useValue: translate }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('setBreakpointsSlides()', () => {
    it('should set the slidesPerView to 1 for resolutions widht less than 480', () => {
      let resizeEntry = { contentRect: { width: 100 } } as ResizeObserverEntry;

      component.setBreakpointsSlides([resizeEntry]);
      expect(component.slidesPerView).toBe(1);

      resizeEntry = { contentRect: { width: 479 } } as ResizeObserverEntry;
      component.setBreakpointsSlides([resizeEntry]);
      expect(component.slidesPerView).toBe(1);
    });

    it('should set the slidesPerView to 3 for resolutions widht between 480 and 1049', () => {
      let resizeEntry = { contentRect: { width: 480 } } as ResizeObserverEntry;

      component.setBreakpointsSlides([resizeEntry]);
      expect(component.slidesPerView).toBe(3);

      resizeEntry = { contentRect: { width: 900 } } as ResizeObserverEntry;
      component.setBreakpointsSlides([resizeEntry]);
      expect(component.slidesPerView).toBe(3);

      resizeEntry = { contentRect: { width: 1049 } } as ResizeObserverEntry;
      component.setBreakpointsSlides([resizeEntry]);
      expect(component.slidesPerView).toBe(3);
    });

    it('should set the slidesPerView to 5 for resolutions widht more than 1049', () => {
      let resizeEntry = { contentRect: { width: 1050 } } as ResizeObserverEntry;

      component.setBreakpointsSlides([resizeEntry]);
      expect(component.slidesPerView).toBe(5);

      resizeEntry = { contentRect: { width: 2000 } } as ResizeObserverEntry;
      component.setBreakpointsSlides([resizeEntry]);
      expect(component.slidesPerView).toBe(5);

      resizeEntry = { contentRect: { width: 3000 } } as ResizeObserverEntry;
      component.setBreakpointsSlides([resizeEntry]);
      expect(component.slidesPerView).toBe(5);
    });
  });

  describe('renderFraction()', () => {
    it('should return the template for the pagination', () => {
      const currentClass = 'current-class',
        totalClass = 'total-class';
      translate.instant.and.returnValue('ships');

      const result = component.renderFraction(currentClass, totalClass);
      expect(translate.instant).toHaveBeenCalledWith('warehouse.ships');
      expect(cleanMultilineString(result)).toBe(
        cleanMultilineString(`<span class="current-class"></span>
         <span> / </span>
         <span class="total-class"></span>
         <span> ships</span>`)
      );
    });
  });

  describe('onSlideInit()', () => {
    beforeEach(() => {
      spyOn(component.focusChange, 'emit');
    });

    it('should emit focused ship as undefined if no ship provided', () => {
      component.ships = [];

      const swiper = { activeIndex: 0 } as Swiper;

      component.onSwiperInit([swiper]);
      expect(component.focusChange.emit).toHaveBeenCalledOnceWith(undefined);
    });

    it('should emit the correct ship on change and on init', () => {
      component.ships = shipsMock;

      const swiper1 = { activeIndex: 1 } as Swiper;
      component.onSwiperInit([swiper1]);
      expect(component.focusChange.emit).toHaveBeenCalledWith(shipsMock[0]);

      const swiper2 = { activeIndex: 2 } as Swiper;
      component.onSlideChange([swiper2]);
      expect(component.focusChange.emit).toHaveBeenCalledWith(shipsMock[2]);
    });
  });

  describe('updateSwiperPagination()', () => {
    it('should render and update the swiper pagination to apply the new translation', () => {
      const paginationSpy = jasmine.createSpyObj('pagination', [
        'render',
        'update',
      ]);

      // @ts-expect-error
      component.swiper = { pagination: paginationSpy };

      // @ts-expect-error
      component.updateSwiperPagination();

      expect(paginationSpy.render).toHaveBeenCalledOnceWith();
      expect(paginationSpy.update).toHaveBeenCalledOnceWith();
    });
  });

  it('should emit `undefined` if no ship provided', () => {
    component.ships = [];
    spyOn(component.focusChange, 'emit');

    component.focusShip(0);
    expect(component.focusChange.emit).toHaveBeenCalledWith(undefined);
  });

  it('should emit the correct Ship', () => {
    component.ships = shipsMock;

    spyOn(component.focusChange, 'emit');

    component.focusShip(0);
    expect(component.focusChange.emit).toHaveBeenCalledWith(component.ships[0]);

    component.focusShip(1);
    expect(component.focusChange.emit).toHaveBeenCalledWith(component.ships[1]);
  });

  function cleanMultilineString(str: string): string {
    return str.replace(/[\n\r\t\s]+/g, ' ');
  }
});
