import { ViewportRuler } from '@angular/cdk/scrolling';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs';
import { ContextRoutingService } from 'src/app/core/context-routing.service';
import { Ship } from 'src/app/model/ship';
import { BaseSubscribeHandlerComponent } from 'src/app/shared/base-subscribe-handler.component';
import { icons } from 'src/app/shared/icons';
import { ModalService } from 'src/app/core/modal/modal.service';
import { WarehouseService } from 'src/app/warehouse/warehouse.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-ship-details-general-warehouse',
  templateUrl: './ship-details-general-warehouse.component.html',
  styleUrls: ['./ship-details-general-warehouse.component.scss']
})
export class ShipDetailsGeneralWarehouseComponent extends BaseSubscribeHandlerComponent {
  @Input() disableWithdrawNFTBtn: boolean = false;
  @Input() disableNFTDepositBtn: boolean = false;
  @Input() ship!: Ship;
  @ViewChild('modalHost', { static: true }) modalHost?: ElementRef;
  NFTExplorerEndpoint = environment.NFTExplorerEndpoint;
  icons = icons;
  toggleTooltip: boolean = false;
  withdrawalInProgress: boolean = false;
  browserEnv: boolean;
  smallResolution: boolean = true;

  constructor(private modalService: ModalService,
    private contextRoutingService: ContextRoutingService,
    private warehouseService: WarehouseService,
    private readonly viewportRuler: ViewportRuler) {

    super();

    this.browserEnv = this.warehouseService.getState().browserEnv;

    this.smallResolution = window.screen.width < 768;

    this.viewportRuler.change()
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => this.smallResolution = window.screen.width < 768);
  }

  openNFTInformationModal(): void {
    this.modalService.openInfoModal({
      title: 'warehouse.modal.information.title',
      sections: [
        {
          subTitle: 'warehouse.modal.information.nftHeading',
          text: ['warehouse.modal.information.nftContent'],
        },
        {
          subTitle: 'warehouse.modal.information.withdrawalDepositsHeading',
          text: [
            'warehouse.modal.information.withdrawalDepositsContentPara1',
            'warehouse.modal.information.withdrawalDepositsContentPara2',
            'warehouse.modal.information.withdrawalDepositsContentPara3',
          ],
        },
        {
          subTitle: 'warehouse.modal.information.benefitsHeading',
          text: [
            'warehouse.modal.information.benefitsContentPara1',
            'warehouse.modal.information.benefitsContentPara1',
          ],
        },
      ],
    });
  }

  transferToWallet(): void {
    this.contextRoutingService.transferShipToWalletEventEmitter.emit(this.ship);
  }

  transferToGame(): void {
    this.contextRoutingService.transferShipToGameEventEmitter.emit(this.ship);
  }

  hideTooltip(event: Event): void {
    event.stopImmediatePropagation();

    if (this.disableWithdrawNFTBtn) {
      setTimeout(() => {
        this.toggleTooltip = false;
      }, 150);
    }
  }

  showTooltip(event: Event): void {
    event.stopImmediatePropagation();

    if (this.disableWithdrawNFTBtn) {
      this.toggleTooltip = true;
    }
  }
}
