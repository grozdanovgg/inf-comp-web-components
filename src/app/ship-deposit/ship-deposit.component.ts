import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import QRCodeStyling from "qr-code-styling";
import { ContextApiService } from 'src/app/core/context-api.service';
import { ContextRoutingService } from 'src/app/core/context-routing.service';
import { LocalizationService } from 'src/app/core/localization.service';
import { ModalService } from 'src/app/core/modal/modal.service';
import { BaseWebComponentComponent } from 'src/app/warehouse/base-web-component.component';
import { BaseWebComponentService } from 'src/app/warehouse/base-web-component.service';
import { WarehouseService } from 'src/app/warehouse/warehouse.service';
import { shipDepositIcons } from './assets';

@Component({
  selector: 'app-ship-deposit',
  templateUrl: './ship-deposit.component.html',
  styleUrls: ['./ship-deposit.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ShipDepositComponent extends BaseWebComponentComponent implements OnInit {

  isInternalRoutingEnabledComponent = false;

  @Input() walletAddress: string = '';
  @Output() navigateToContextRoute: EventEmitter<string> = this.contextRoutingService.navigateToContextRouteEventEmitter;
  @Output() navigateToWarehouse: EventEmitter<void> = this.contextRoutingService.navigateToWarehouseEventEmitter;

  @ViewChild("qrCode", { static: true }) qrCode!: ElementRef;

  @Input() closeModal!: () => void;
  icons = shipDepositIcons;
  toggleTooltip = false;

  constructor(
    private contextRoutingService: ContextRoutingService,
    modalService: ModalService,
    localization: LocalizationService,
    contextApiService: ContextApiService,
    rootElement: ElementRef,
    baseWebComponentService: BaseWebComponentService,
    warehouseService: WarehouseService) {

    super(rootElement, baseWebComponentService, contextApiService, localization, modalService, warehouseService);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    let imageName = 'base_qr_code.png';
    let imagePath = './assets/images/base_qr_code.png';
    this.checkIfImageExists(imagePath, (exists: boolean) => {
      if (exists) {
        const qrCode = new QRCodeStyling({
          width: 195,
          height: 195,
          margin: 0,
          data: this.walletAddress,
          image: imagePath,
          dotsOptions: {
            color: "#000000",
            type: "square"
          },
          backgroundOptions: {
            color: "#ffffff"
          },
          imageOptions: {
            imageSize: 0.4,
            hideBackgroundDots: true,
          },
          cornersSquareOptions: {
            type: "square",
          },
        });
        qrCode.append(this.qrCode.nativeElement);


      } else {
        console.error(
          `Image at image path ${imagePath} not found! Please add an image with name ${imageName} in assets/images`
        );
      }
    });
  }

  hideTooltip(event: Event): void {
    event.stopImmediatePropagation();
    setTimeout(() => {
      this.toggleTooltip = false;
    }, 150);
  }

  showTooltip(): void {
    this.toggleTooltip = true;
    navigator.clipboard.writeText(this.walletAddress || '');

    setTimeout(() => {
      this.toggleTooltip = false;
    }, 150);
  }

  copyToClipboard(): void {
    this.toggleTooltip = true;
    navigator.clipboard.writeText(this.walletAddress || '');
  }

  private checkIfImageExists(imagePath: string, callback: any) {
    const img = new Image();
    img.src = imagePath;

    if (img.complete) {
      callback(true);
    } else {
      img.onload = () => {
        callback(true);
      };

      img.onerror = () => {
        callback(false);
      };
    }
  }

  close() {
    this.navigateToWarehouse.emit();
  }
}
