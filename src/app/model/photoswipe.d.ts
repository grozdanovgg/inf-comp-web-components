/*
  Temporary defining the typings for PhotoSwipeLightbox and PhotoSwipeLightboxWrapper untill there is a release of the https://www.npmjs.com/package/@types/photoswipe for version 5.x.x
  The typings are not complete. Extend them when needed - https://photoswipe.com/v5/docs/getting-started/
*/
declare module 'photoswipe';
declare module 'photoswipe/lightbox' {
  export default class PhotoSwipeLightboxWrapper extends PhotoSwipeLightbox {

  }

  export abstract class PhotoSwipeLightbox {
    pswp: PhotoSwipe;
    constructor(options: any);

    init(): void;
    loadAndOpen(foo: number): void;
    on(event: string, callback: (e: PhotoSwipeEvent) => void): void;
  }

  export type PhotoSwipe = {
    currSlide: PhotoSwiepeSlide;
  };

  export type PhotoSwiepeSlide = {
    zoomLevels: ZoomLevel;
    currZoomLevel: number;
    zoomTo(zoomLevel: ZoomLevelType, zoomCenterPoint?: ZoomCenterType, transitionDuration?: number, ignorePanZoomBounds?: boolean): void;
  };

  export type PhotoSwipeLightboxOptions = {
    gallery?: Element | Element[] | NodeList | string;
    children?: Element | Element[] | NodeList | string;
    pswpModule: string | object | null;
    preloadFirstSlide?: boolean;
    preload?: number[];
    getClickedIndexFn?: (event: Event) => number;
    showHideAnimationType?: 'zoom' | 'fade' | 'none';
    showAnimationDuration?: number;
    hideAnimationDuration?: number;
    dataSource?: PhotoSwipeDataSource[];
    bgOpacity?: number;
    appendToEl?: Element;
    zoom?: boolean;
    counter?: boolean;
    preloaderDelay?: number;
    initialZoomLevel?: ZoomLevelType;
    secondaryZoomLevel?: ZoomLevelType;
    maxZoomLevel?: ZoomLevelType;
    imageClickAction?: ActionValue;
    tapAction?: ActionValue;
    doubleTapAction?: ActionValue;
    bgClickAction?: ActionValue;
  };

  export type ActionValue = 'zoom' | 'zoom-or-close' | 'toggle-controls' | 'next' | 'close' | boolean | ((...args: any) => void);

  export type PhotoSwipeDataSource = {
    src?: string;
    w?: number;
    h?: number;
    alt?: string;
    srcset?: string;
    html?: string;
    initialZoomLevel?: ZoomLevelType;
    secondaryZoomLevel?: ZoomLevelType;
    maxZoomLevel?: ZoomLevelType;
    mouseMovePan?: boolean;
  };

  export type ZoomLevelType = number | 'fit' | 'fill' | ((zoomLevelObject: ZoomLevel) => number | 'fit' | 'fill');

  export type ZoomLevel = {
    elementSize: { x: number, y: number; };
    fill: number;
    fit: number;
    index: number;
    initial: number;
    itemData: PhotoSwipeDataSource;
    max: number;
    min: number;
    options: PhotoSwipeLightboxOptions;
    panAreaSize: { x: number, y: number; };
    pswp: PhotoSwipe;
    secondary: number;
    vFill: number;
  };

  export type ZoomCenterType = {
    x: number;
    y: number;
  };

  export type PhotoSwipeEvent = {
    originalEvent: PointerEvent;
    type: string;
  };
}



