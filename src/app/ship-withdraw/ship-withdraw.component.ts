import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ContextApiService } from 'src/app/core/context-api.service';
import { ContextRoutingService } from 'src/app/core/context-routing.service';
import { Ship } from 'src/app/model/ship';
import { ModalService } from 'src/app/core/modal/modal.service';
import { BaseWebComponentComponent } from 'src/app/warehouse/base-web-component.component';
import { BaseWebComponentService } from 'src/app/warehouse/base-web-component.service';
import { WarehouseService } from 'src/app/warehouse/warehouse.service';
import { environment } from 'src/environments/environment';
import { arrowIcons } from './assets';
import { LocalizationService } from 'src/app/core/localization.service';
@Component({
  selector: 'app-ship-withdraw',
  templateUrl: './ship-withdraw.component.html',
  styleUrls: ['./ship-withdraw.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipWithdrawComponent extends BaseWebComponentComponent {
  @Input() ship!: Ship;

  @Output() navigateToWarehouse: EventEmitter<void> = this.contextRoutingService.navigateToWarehouseEventEmitter;
  @Output() withdrawRequest: EventEmitter<void> = this.contextRoutingService.withdrawRequestEventEmitter;

  isInternalRoutingEnabledComponent = false;
  NFTExplorerEndpoint = environment.NFTExplorerEndpoint;
  icons = arrowIcons;
  withdrawWalletAddress: string = '';

  constructor(
    private contextRoutingService: ContextRoutingService,
    modalService: ModalService,
    localization: LocalizationService,
    contextApiService: ContextApiService,
    rootElement: ElementRef,
    baseWebComponentService: BaseWebComponentService,
    warehouseService: WarehouseService
  ) {

    super(rootElement, baseWebComponentService, contextApiService, localization, modalService, warehouseService);
  }

  requestWithdraw() {
    console.log('Requesting withdraw emit');

    this.withdrawRequest.emit();
  }

  close() {
    this.navigateToWarehouse.emit();
  }
}
