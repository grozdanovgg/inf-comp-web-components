import {
  Injectable,
  Injector,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  ApplicationRef,
  ComponentRef,
  Type
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector
  ) { }

  createComponent(component: Type<unknown>, componentProps?: object): ComponentRef<unknown> {
    // 1. Create a component reference from the component
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);

    if (componentProps && typeof componentRef.instance === 'object') {
      Object.assign(componentRef.instance as Object, componentProps);
    }

    return componentRef;
  }

  attachComponent(componentRef: ComponentRef<unknown>, appendTo: Element): void {
    // 2. Attach component to the applicationRef so that it's inside the ng component tree
    this.applicationRef.attachView(componentRef.hostView);

    // 3. Get DOM element from component
    const domElem: HTMLElement = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0];

    // 4. Append DOM element to the body
    appendTo.appendChild(domElem);
  }
}
