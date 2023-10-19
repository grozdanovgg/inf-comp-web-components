import { EventEmitter, Injectable } from '@angular/core';
import { Ship } from 'src/app/model/ship';

@Injectable({
  providedIn: 'root'
})
export class ContextRoutingService {
  navigateToContextRouteEventEmitter = new EventEmitter<string>();
  transferShipToWalletEventEmitter = new EventEmitter<Ship>();
  navigateToWarehouseEventEmitter = new EventEmitter<void>();
  transferShipToGameEventEmitter = new EventEmitter<Ship>();
  withdrawRequestEventEmitter = new EventEmitter<void>();
}
