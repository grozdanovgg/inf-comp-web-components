import { BaseWebComponentService } from 'src/app/warehouse/base-web-component.service';
import { Ship } from 'src/app/model/ship';
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

import PhotoSwipeLightbox, { PhotoSwipeEvent, PhotoSwipeLightboxOptions } from 'photoswipe/lightbox';
import PhotoSwipe from 'photoswipe';
import { WarehouseService } from 'src/app/warehouse/warehouse.service';

@Component({
  selector: 'app-ship-card',
  templateUrl: './ship-card.component.html',
  styleUrls: ['./ship-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipCardComponent {
  @Input() ship!: Ship;
  @Input() isOnFocus!: boolean;

  selectedImage: 'Front' | 'Back' | 'Top' | 'Bottom' = 'Front';
  //Index to maintain the order of the icons
  readonly iconPathKeys: string[] = ['Front', 'Back', 'Top', 'Bottom'];
  iconPaths: { [key: string]: string[] } = {
    Front: [
      'M0.181 8.222c4.477-2.573 8.942-5.165 13.419-7.741 4.478 2.579 8.949 5.171 13.429 7.749 0.024 5.176 0.011 10.355 0.005 15.533-4.478 2.584-8.954 5.174-13.434 7.755-4.478-2.578-8.947-5.171-13.426-7.746-0.019-5.181-0.032-10.371 0.006-15.55zM1.762 9.163c-0.002 4.558-0.006 9.115 0.002 13.674 3.947 2.275 7.888 4.558 11.837 6.83 3.947-2.274 7.891-4.554 11.835-6.83 0.010-4.558 0.003-9.115 0.003-13.674-3.947-2.274-7.89-4.558-11.838-6.83-3.95 2.27-7.891 4.555-11.838 6.83z',
      'M4.322 12.963c2.558 1.501 5.12 2.998 7.677 4.504 0.003 2.763 0.003 5.528 0 8.293-2.56-1.501-5.122-2.998-7.677-4.506-0.002-2.765-0.003-5.528 0-8.291z',
    ],
    Back: [
      'M0.32 8.198c4.429-2.571 8.854-5.146 13.282-7.72 4.426 2.573 8.851 5.147 13.277 7.718 0.002 5.149 0.002 10.298 0 15.446-4.426 2.57-8.85 5.142-13.274 7.715-4.43-2.57-8.854-5.147-13.283-7.718-0.003-5.147-0.002-10.294-0.002-15.442zM1.92 9.117c0 4.533 0.002 9.067 0 13.602 3.891 2.267 7.787 4.528 11.68 6.792 3.898-2.261 7.792-4.53 11.69-6.792 0-4.531-0.002-9.064 0-13.595-3.893-2.269-7.792-4.528-11.685-6.797-3.896 2.261-7.789 4.528-11.685 6.79z',
      'M15.203 17.333c2.507-1.451 5.010-2.914 7.515-4.37 0.003 2.755 0.003 5.51 0 8.264-2.509 1.453-5.011 2.915-7.518 4.371 0.002-2.755-0.005-5.51 0.003-8.266z',
    ],
    Top: [
      'M0.322 8.2c4.426-2.573 8.853-5.147 13.278-7.72 4.426 2.573 8.853 5.147 13.28 7.72 0 5.146 0 10.291 0 15.438-4.427 2.573-8.853 5.147-13.28 7.72-4.427-2.573-8.853-5.147-13.28-7.722 0-5.146-0.002-10.291 0.002-15.437zM1.92 9.117c0 4.533 0 9.067 0 13.602 3.891 2.267 7.786 4.53 11.68 6.792 3.894-2.262 7.789-4.525 11.68-6.792 0-4.534 0.002-9.069 0-13.602-3.894-2.262-7.786-4.526-11.68-6.789-3.894 2.261-7.786 4.526-11.68 6.789z',
      'M6.243 9.514c2.437-1.35 4.853-2.736 7.296-4.074 2.411 1.374 4.842 2.717 7.261 4.078-2.416 1.366-4.85 2.702-7.256 4.082-2.445-1.342-4.874-2.715-7.301-4.086z',
    ],
    Bottom: [
      'M0.17 8.226c4.485-2.57 8.954-5.166 13.432-7.746 4.475 2.578 8.941 5.176 13.426 7.741 0.021 5.186 0.021 10.373 0 15.558-4.485 2.563-8.95 5.162-13.426 7.741-4.478-2.579-8.947-5.176-13.432-7.747-0.016-5.182-0.016-10.365 0-15.547zM1.762 9.163c-0.003 4.557-0.003 9.115 0 13.674 3.947 2.275 7.893 4.555 11.838 6.834 3.947-2.277 7.891-4.558 11.84-6.834 0-4.557 0-9.115 0-13.674-3.949-2.275-7.893-4.558-11.84-6.834-3.947 2.277-7.891 4.558-11.838 6.834z',
      'M6.24 22.482c2.453-1.363 4.907-2.722 7.36-4.085 2.453 1.363 4.907 2.723 7.362 4.085-2.456 1.357-4.909 2.72-7.362 4.082-2.453-1.362-4.904-2.725-7.36-4.082z',
    ],
  };

  currentIconPath = this.iconPaths['Front'];

  inSelectedIconView = true;
  browserEnv = true;
  
  constructor(private changeDetectorRef: ChangeDetectorRef,
    private baseWebComponentService: BaseWebComponentService,
    private warehouseService: WarehouseService) {
      
    this.browserEnv = this.warehouseService.getState().browserEnv;
  }

  updateSelector(e: Event, type: any): void {
    e.preventDefault();
    this.inSelectedIconView = true;
    this.currentIconPath = this.iconPaths[type];
    this.selectedImage = type;
    //to detect the above retraction changes    
    this.changeDetectorRef.detectChanges();
  }

  onViewIconHover(e: Event): void {
    //setTimeOut for mobile devices -> postpones toggling the inViewSelection variable
    //until the event has passed; avoids triggering onClick methods on other DOM elements

    if (!this.ship.PendingWithdrawal) {
      setTimeout(() => {
        this.inSelectedIconView = false;
        this.changeDetectorRef.detectChanges();
      });
    }
  }

  onViewIconHoverLeave(e: Event): void {
    setTimeout(() => {
      this.inSelectedIconView = true;
      this.changeDetectorRef.detectChanges();
    });
  }

  setAnimationClasses(i: number) {
    return {
      'fade-in': i === 0,
      'fade-in-50ms': i === 1,
      'fade-in-100ms': i === 2,
      'fade-in-150ms': i === 3,
    };
  }

  openFullscreen($event: Event): void {

    $event.stopPropagation();
    $event.preventDefault();

    if (!this.ship.PendingWithdrawal) {
      const options: PhotoSwipeLightboxOptions = {
        showHideAnimationType: 'zoom',
        preloadFirstSlide: true,
        preload: [3, 3],
        bgOpacity: 1,
        appendToEl: this.baseWebComponentService.rootElement,
        preloaderDelay: 1000,
        pswpModule: PhotoSwipe,
        initialZoomLevel: 'fit',
        secondaryZoomLevel: 1.5,
        maxZoomLevel: 4,
        dataSource: Object.entries(this.ship.Images).map(([side, image]) => {
          return {
            src: image,
            w: 3000,
            h: 1688,
            alt: `Ship ${side} image`,
            initialZoomLevel: 'fit',
            secondaryZoomLevel: 1.5,
            maxZoomLevel: 4
          };
        })
      };

      const gallery = new PhotoSwipeLightbox(options);

      this.handleZoomInOut(gallery);

      gallery.init();

      const galleryIndex = this.iconPathKeys.findIndex(
        (pathKey) => pathKey === this.selectedImage
      );
      gallery.loadAndOpen(galleryIndex);
    }
  }

  /**
  * Workaround for not working click-zoom functionality
  * Currently click to zoom does not work by default.
  * The properties regarding zoom has no effect on the Photoswipe behaviour
  */
  private handleZoomInOut(gallery: PhotoSwipeLightbox) {
    let moving = false;

    gallery.on('pointerDown', (e: PhotoSwipeEvent) => {
      moving = false;
    });

    gallery.on('pointerUp', (e: PhotoSwipeEvent) => {

      // @ts-ignore
      if (!moving && e.originalEvent.path[0]?.className === 'pswp__img' || e.originalEvent.path[0]?.className === 'pswp__item') {

        if (gallery.pswp.currSlide.currZoomLevel < gallery.pswp.currSlide.zoomLevels.initial) {
          gallery.pswp.currSlide.zoomTo(gallery.pswp.currSlide.zoomLevels.initial, { x: e.originalEvent.x, y: e.originalEvent.y }, 300);

        } else if (gallery.pswp.currSlide.currZoomLevel === gallery.pswp.currSlide.zoomLevels.initial) {
          gallery.pswp.currSlide.zoomTo(gallery.pswp.currSlide.zoomLevels.secondary, { x: e.originalEvent.x, y: e.originalEvent.y }, 300);

        } else if (gallery.pswp.currSlide.currZoomLevel > gallery.pswp.currSlide.zoomLevels.initial) {
          gallery.pswp.currSlide.zoomTo(gallery.pswp.currSlide.zoomLevels.initial, { x: e.originalEvent.x, y: e.originalEvent.y }, 300);
        }
      }
    });

    gallery.on('pointerMove', (e: PhotoSwipeEvent) => {
      moving = true;
    });
  }
}
