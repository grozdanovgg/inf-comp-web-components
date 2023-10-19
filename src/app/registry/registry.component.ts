import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ContextApiService } from 'src/app/core/context-api.service';
import { ContextRoutingService } from 'src/app/core/context-routing.service';
import { Ship } from 'src/app/model/ship';
import { ModalService } from 'src/app/core/modal/modal.service';
import { BaseWebComponentComponent } from 'src/app/warehouse/base-web-component.component';
import { BaseWebComponentService } from 'src/app/warehouse/base-web-component.service';
import { WarehouseService } from 'src/app/warehouse/warehouse.service';
import { LocalizationService } from 'src/app/core/localization.service';
@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistryComponent extends BaseWebComponentComponent implements OnInit {
  @Input() ship!: Ship;

  @Output() navigateToContextRoute: EventEmitter<string> = this.contextRoutingService.navigateToContextRouteEventEmitter;
  isInternalRoutingEnabledComponent = false;

  constructor(private contextRoutingService: ContextRoutingService,
    modalService: ModalService,
    localization: LocalizationService,
    contextApiService: ContextApiService,
    rootElement: ElementRef,
    baseWebComponentService: BaseWebComponentService,
    warehouseService: WarehouseService) {
      
    super(rootElement, baseWebComponentService, contextApiService, localization, modalService, warehouseService);

    this.ship = new Ship(this.ship);
  }
}
