import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ContextApiService } from 'src/app/core/context-api.service';
import { ContextRoutingService } from 'src/app/core/context-routing.service';
import { Ship } from 'src/app/model/ship';
import { ModalService } from 'src/app/core/modal/modal.service';
import { BaseWebComponentComponent } from 'src/app/warehouse/base-web-component.component';
import { BaseWebComponentService } from 'src/app/warehouse/base-web-component.service';
import { WarehouseService } from 'src/app/warehouse/warehouse.service';
import { LocalizationService } from 'src/app/core/localization.service';

@Component({
  selector: 'app-warehouse-routing',
  templateUrl: './warehouse-routing.component.html',
  styleUrls: ['./warehouse-routing.component.scss']
})
export class WarehouseRoutingComponent extends BaseWebComponentComponent implements OnInit {
  @Input() ships: Ship[] = [];
  @Input() disableNFTDepositBtn: boolean = false;
  @Input() disableWithdrawNFTBtn: boolean = false;
  @Input() hasWallet = false;
  @Input() infBalance = 0;

  @Output() navigateToContextRoute: EventEmitter<string> = this.contextRoutingService.navigateToContextRouteEventEmitter;
  @Output() transferShipToWallet: EventEmitter<Ship> = this.contextRoutingService.transferShipToWalletEventEmitter;
  @Output() transferShipToGame: EventEmitter<Ship> = this.contextRoutingService.transferShipToGameEventEmitter;

  isInternalRoutingEnabledComponent = true;

  constructor(
    private router: Router,
    private contextRoutingService: ContextRoutingService,
    localization: LocalizationService,
    contextApiService: ContextApiService,
    rootElement: ElementRef,
    baseWebComponentService: BaseWebComponentService,
    modalService: ModalService,
    warehouseService: WarehouseService) {

    super(rootElement, baseWebComponentService, contextApiService, localization, modalService, warehouseService);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.router.navigate(['warehouse'], {
      state: {
        ships: this.ships,
        disableNFTDepositBtn: this.disableNFTDepositBtn,
        disableWithdrawNFTBtn: this.disableWithdrawNFTBtn,
        browserEnv: this.browserEnv,
        hasWallet: this.hasWallet,
        infBalance: this.infBalance
      }
    });
  }
}
