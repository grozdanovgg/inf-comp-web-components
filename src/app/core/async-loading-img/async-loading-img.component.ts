import {
  ChangeDetectorRef, Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { PlatformService } from 'src/app/core/platform.service';
// services
@Component({
  selector: 'app-inf-async-loading-img',
  templateUrl: './async-loading-img.component.html',
  styleUrls: ['./async-loading-img.component.scss'],
})
export class AsyncLoadingImgComponent implements OnChanges {
  @Input()
  imgSrc: string = '';

  @Input()
  inBlack = false;

  previousImgSrc = '';

  @Input()
  paddingBottom = 100;

  @Input()
  pendingWithdrawal = false;

  @Input()
  fixBlur = false;

  @Input()
  height = 'auto';

  @Input()
  backgroundPosition = 'center center';

  @Input()
  role = 'img';

  @Input()
  ariaLabel = 'image of the ship';

  pictureLoaded = false;

  // access the results of a ViewChild query before the view has completed initializing
  // either use the query static or move the logic to ngAfterViewInit
  @ViewChild('image', { static: true })
  image: ElementRef = {} as ElementRef;

  constructor(
    private platformService: PlatformService,
    private changeRef: ChangeDetectorRef
  ) {
  }

  ngOnChanges(changeEvent: SimpleChanges) {
    if (this.platformService.isBrowser()) {
      if (
        changeEvent['imgSrc'].currentValue &&
        changeEvent['imgSrc'].currentValue !==
        changeEvent['imgSrc'].previousValue
      ) {
        this.pictureLoaded = false;
        this.image.nativeElement.style.backgroundImage = 'none';

        this.preloadImage(this.imgSrc, () => {
          // this.previousImgSrc = this.imgSrc;
          // add this line if cache is not needed
          // const ts = '?' + new Date().getTime();

          this.image.nativeElement.style.backgroundImage = `url(${this.imgSrc})`;

          this.pictureLoaded = true;
          this.changeRef.detectChanges();
        });

        // use settimeout to stall the calling of prepareImage
        // because #image element is undefined in first on-change lifecycle
        // timer(600).pipe(takeUntil(this.destroy$)).subscribe(() => {
        // });
      }
    }
  }

  preloadImage(url: any, cb: any) {
    // The browser will start downloading the image asychronously as soon as you assign a src
    // there is the possibility the download could complete before you attach the onload event handler
    // and at this point the onload event will never fire
    // therefore set onload before set src
    const imgEle = new Image();
    imgEle.onload = cb;
    imgEle.src = url;
  }

  // This block will set the element's inline styles to the below values. Some values can be set with input properties
  // If the fixBlur boolean input property is true, image-rendering value will be set only if the userAgent is not Safari.
  getStyles() {
    const styles = {
      'background-position': this.backgroundPosition,
      height: this.height,
      'padding-top': `${this.paddingBottom}%`,
      'image-rendering': 'auto',
    };
    if (this.fixBlur) {
      const userAgentStr = navigator.userAgent.toLowerCase();
      const isChrome = userAgentStr.indexOf('chrome') > -1;
      let isSafari = userAgentStr.indexOf('safari') > -1;
      if (isChrome && isSafari) {
        isSafari = false;
      }
      if (!isSafari) {
        styles['image-rendering'] = '-webkit-optimize-contrast';
      }
    }
    return styles;
  }
}
