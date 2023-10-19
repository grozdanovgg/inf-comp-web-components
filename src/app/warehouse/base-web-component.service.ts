import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseWebComponentService {
  private _rootElement?: ElementRef;
  private isInternalRoutingEnabled: boolean = false;

  initRootElement(rootElement: ElementRef, isInternalRoutingEnabled: boolean) {
    this.isInternalRoutingEnabled = isInternalRoutingEnabled;
    this._rootElement = rootElement;
  }

  get rootElement(): Element {
    if (this.isInternalRoutingEnabled) {
      
      // Expect the first element to be the <router-outlet></router-outlet>
      // And the second one to be the main root
      return this._rootElement?.nativeElement.children[1].shadowRoot;
    }

    return this._rootElement?.nativeElement.shadowRoot;
  }
}
