import { EventEmitter } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ContextRoutingService } from './context-routing.service';

describe('ContextRoutingService', () => {
  let service: ContextRoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContextRoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.navigateToContextRouteEventEmitter).toEqual(jasmine.any(EventEmitter));
    expect(service.transferShipToWalletEventEmitter).toEqual(jasmine.any(EventEmitter));
    expect(service.navigateToWarehouseEventEmitter).toEqual(jasmine.any(EventEmitter));
    expect(service.transferShipToGameEventEmitter).toEqual(jasmine.any(EventEmitter));
    expect(service.withdrawRequestEventEmitter).toEqual(jasmine.any(EventEmitter));
  });
});
