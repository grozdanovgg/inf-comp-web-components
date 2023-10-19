import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Ship } from 'src/app/model/ship';
import SwiperCore, { EffectCoverflow, Keyboard, Lazy, Mousewheel, Navigation, Pagination, Swiper, SwiperOptions } from 'swiper';
import { SwiperEvents } from 'swiper/types';

SwiperCore.use([Keyboard, Mousewheel, Pagination, Navigation, EffectCoverflow, Lazy]);
@Component({
  selector: 'app-ships-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent implements OnInit, OnDestroy {
  @Input() ships: Ship[] = [];
  @Output() focusChange = new EventEmitter<Ship>();

  @Output() focusedShip: EventEmitter<Ship> = new EventEmitter();

  @ViewChild('swiperElement', { static: false }) swiperComponent?: ElementRef;
  config: SwiperOptions = {
    pagination: {
      type: 'fraction',
      renderFraction: this.renderFraction.bind(this),
    },
    grabCursor: true,
    centeredSlides: true,
    observer: true,
    keyboard: { enabled: true },
    mousewheel: false,
    scrollbar: true,
    navigation: true,
    slideToClickedSlide: true,
    preloadImages: false,
    lazy: {
      enabled: true,
      checkInView: true,
      loadOnTransitionStart: true,
      loadPrevNext: true,
      loadPrevNextAmount: 1
    },
    autoHeight: false,
    watchSlidesProgress: true
  };
  slidesPerView = 1;
  spaceBetween = 0;

  focusedShipObject?: Ship;

  private swiper?: Swiper;
  private changeLanguageSubscriptioin?: Subscription;

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.changeLanguageSubscriptioin = this.translate.onLangChange.subscribe(
      this.updateSwiperPagination.bind(this)
    );
  }

  ngOnDestroy(): void {
    this.changeLanguageSubscriptioin?.unsubscribe();
  }

  setBreakpointsSlides([resizeEntry]: ResizeObserverEntry[]) {
    const width: number = resizeEntry.contentRect.width;

    this.handleSpaceBetween(width);
    this.handleSlidesPerView(width);
  }

  private handleSlidesPerView(width: number): void {
    if (width < 480) {
      this.slidesPerView = 1;
    } else if (width < 1050) {
      this.slidesPerView = 3;
    } else {
      this.slidesPerView = 5;
    }
  }


  private handleSpaceBetween(width: number): void {
    if (width < 340) {
      this.spaceBetween = -55;
    } else if (width < 400) {
      this.spaceBetween = -65;
    } else if (width < 440) {
      this.spaceBetween = -70;
    } else if (width < 480) {
      this.spaceBetween = -75;
    } else {
      this.spaceBetween = 0;
    }
  }


  onSwiperInit([swiper]: Parameters<SwiperEvents['init']>): void {
    this.swiper = swiper;
    this.focusShip(0);
  }

  onSlideChange([swiper]: Parameters<SwiperEvents['slideChange']>): void {
    this.focusShip(swiper.activeIndex);
  }

  focusShip(index: number) {
    let focusedShip;
    if (this.ships.length) {
      focusedShip = this.ships[index];
    }
    this.focusedShipObject = focusedShip;
    this.focusChange.emit(focusedShip);
  }

  renderFraction(currentClass: string, totalClass: string): string {
    return `<span class="${currentClass}"></span>
            <span> / </span>
            <span class="${totalClass}"></span>
            <span> ${this.translate.instant('warehouse.ships')}</span>`;
  }

  private updateSwiperPagination() {
    this.swiper?.pagination.render();
    this.swiper?.pagination.update();
  }
}
