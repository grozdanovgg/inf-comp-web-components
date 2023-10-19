import { ModalService } from 'src/app/core/modal/modal.service';
import { ContextApiService } from 'src/app/core/context-api.service';
import { Observable } from 'rxjs';
import { BaseWebComponentService } from './base-web-component.service';
import { Component, ElementRef, Input, OnChanges, SimpleChanges, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { WarehouseService } from 'src/app/warehouse/warehouse.service';
import { LocalizationService } from 'src/app/core/localization.service';

@Component({
  template: ''
})
export abstract class BaseWebComponentComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  abstract isInternalRoutingEnabledComponent: boolean;

  @Input() language: string = 'en';
  @Input() get!: (path: string) => Observable<any>;
  @Input() post!: (path: string, data: object) => Observable<any>;
  @Input() put!: (path: string, data: object) => Observable<any>;
  @Input() browserEnv = true;
  
  constructor(
    protected rootElement: ElementRef,
    protected baseWebComponentService: BaseWebComponentService,
    protected contextApiService: ContextApiService,
    protected localization: LocalizationService,
    protected modalService: ModalService,
    protected warehouseService: WarehouseService) {

  }

  ngOnInit(): void {
    this.localization.use(this.language);

    this.contextApiService.init({
      get: this.get,
      post: this.post,
      put: this.put
    });

    this.warehouseService.updateState({browserEnv: this.browserEnv});
  }

  ngOnChanges({ language }: SimpleChanges): void {
    if (language && language.currentValue !== language.previousValue) {
      this.localization.use(language.currentValue);
    }
  }

  ngAfterViewInit(): void {
    this.baseWebComponentService.initRootElement(this.rootElement, this.isInternalRoutingEnabledComponent);
  }

  ngOnDestroy(): void {
    this.modalService.destroyModalContainer();
  }
}
