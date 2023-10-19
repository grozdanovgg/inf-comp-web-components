import { ApplicationRef, Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injector, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DomService } from 'src/app/core/dom-service.service';

describe('DomServiceService', () => {
  let service: DomService,
    resolveComponentFactorySpy: jasmine.SpyObj<ComponentFactory<unknown>>,
    componentFactoryResolverSpy: jasmine.SpyObj<ComponentFactoryResolver>,
    applicationRefSpy: jasmine.SpyObj<ApplicationRef>;


  beforeEach(() => {
    resolveComponentFactorySpy = jasmine.createSpyObj('resolveComponentFactory', ['create']);
    componentFactoryResolverSpy = jasmine.createSpyObj('componentFactoryResolver', ['resolveComponentFactory']);
    applicationRefSpy = jasmine.createSpyObj('applicationRef', ['attachView']);

    componentFactoryResolverSpy.resolveComponentFactory.and.returnValue(resolveComponentFactorySpy);

    TestBed.configureTestingModule({
      providers: [
        { provide: ComponentFactoryResolver, useValue: componentFactoryResolverSpy },
        { provide: ApplicationRef, useValue: applicationRefSpy },
        Injector,
      ]
    });

    service = TestBed.inject(DomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createComponent()', () => {
    let component: Type<unknown>,
      componentRef: ComponentRef<unknown>;

    beforeEach(() => {
      componentRef = {
        id: 'fooCompRef',
        instance: {
          id: 'fooInstance'
        }
      } as unknown as ComponentRef<unknown>;

      component = {} as Type<unknown>;
      resolveComponentFactorySpy.create.and.returnValue(componentRef)
    });

    it('should create and return componentRef object', () => {
      const result = service.createComponent(component)

      expect(componentFactoryResolverSpy.resolveComponentFactory).toHaveBeenCalledOnceWith(component);
      expect(resolveComponentFactorySpy.create).toHaveBeenCalledOnceWith(service['injector']);
      expect(result).toEqual(componentRef);
    });

    it('should assing componentProps to the componentRef.instance if they are provided', () => {
      const componentProps = {
        fooProp: 'fooValue'
      };
      const expected = {
        id: 'fooCompRef',
        instance: {
          id: 'fooInstance',
          ...componentProps
        }
      } as unknown as ComponentRef<unknown>;

      const result = service.createComponent(component, componentProps);

      expect(result).toEqual(expected);
    });
  });

  describe('attachComponent()', () => {
    let componentRef: ComponentRef<unknown>,
      appendToSpy: jasmine.SpyObj<Element>,
      node: Node;

    beforeEach(() => {
      node = { id: 'fooRootNode' } as unknown as Node
      componentRef = {
        hostView: { rootNodes: [node] }
      } as unknown as ComponentRef<unknown>;

      appendToSpy = jasmine.createSpyObj('appendTo', ['appendChild']);
    });
    it('should attachView to the applicationRef and append the dom element to the appendTo object', () => {
      service.attachComponent(componentRef, appendToSpy);

      expect(applicationRefSpy.attachView).toHaveBeenCalledOnceWith(componentRef.hostView);
      expect(appendToSpy.appendChild).toHaveBeenCalledOnceWith(node);
    });
  });
});
