import {
  Component, NgZone, ViewChildren, ViewEncapsulation
} from '@angular/core';
import { MatTab } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { ContextRoutingService } from 'src/app/core/context-routing.service';
import { Ship } from 'src/app/model/ship';
import { ModalService } from 'src/app/core/modal/modal.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class WarehouseComponent {
  browserEnv!: boolean;
  ships!: Ship[];
  focusedShip?: Ship;
  walletAddress?: string;
  disableNFTDepositBtn: boolean;
  disableWithdrawNFTBtn: boolean;
  toggleTooltip: boolean = false;
  hasWallet!: boolean;
  infBalance: number = 0;

  @ViewChildren(MatTab) tabs!: MatTab[];
  selectedTabIndex = 0;

  constructor(
    private modalService: ModalService,
    private ngZone: NgZone,
    private contextRoutingService: ContextRoutingService,
    router: Router) {

    const { ships, disableNFTDepositBtn, disableWithdrawNFTBtn, browserEnv, hasWallet, infBalance } = router.getCurrentNavigation()?.extras?.state || {};

    this.ships = (ships || []).map((shipObj: Ship) => new Ship(shipObj));
    this.disableNFTDepositBtn = disableNFTDepositBtn ?? false;
    this.disableWithdrawNFTBtn = disableWithdrawNFTBtn ?? false;
    this.browserEnv = browserEnv ?? true;
    this.hasWallet = hasWallet ?? false;
    this.infBalance = infBalance ?? 0;

    console.log('Initialized ships: ', this.ships);
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

  swipeLeft(): void {
    if (this.selectedTabIndex < this.tabs.length) {
      this.selectedTabIndex++;
    }
  }

  swipeRight(): void {
    if (this.selectedTabIndex > 0) {
      this.selectedTabIndex--;
    }
  }

  transferShipToGame(): void {
    this.contextRoutingService.transferShipToGameEventEmitter.emit();
  }

  navigateToContextRoute(route: string): void {
    this.contextRoutingService.navigateToContextRouteEventEmitter.emit(route);
  }

  onShipChangeInSlider(ship: Ship): void {
    // The ngZone.run is needed to detect the changes from the slider at all.
    // The timeout is needed to avoid "Expression has changed after it was checked" error
    // https://angular.io/errors/NG0100
    this.ngZone.run(() => {
      setTimeout(() => {
        this.focusedShip = new Ship(ship); 
      }, 0);
    });
  }

  hideTooltip(event: Event): void {
    event.stopImmediatePropagation();
    if (this.disableNFTDepositBtn) {
      setTimeout(() => {
        this.toggleTooltip = false;
      }, 150);

    }
  }

  showTooltip(event: Event): void {
    event.stopImmediatePropagation();
    if (this.disableNFTDepositBtn) {
      this.toggleTooltip = true;
    }
  }
}
