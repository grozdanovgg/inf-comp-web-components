import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { WarehouseRoutingComponent } from './warehouse-routing.component';

describe('WarehouseRoutingComponent', () => {
  let component: WarehouseRoutingComponent;
  let fixture: ComponentFixture<WarehouseRoutingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        })
      ],
      declarations: [WarehouseRoutingComponent],
      providers: []
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.ships).toEqual([]);
    expect(component.disableNFTDepositBtn).toBeFalse();
    expect(component.disableWithdrawNFTBtn).toBeFalse();
    expect(component.hasWallet).toBeFalse();
    expect(component.infBalance).toBe(0);
    expect(component.isInternalRoutingEnabledComponent).toBeTrue();
    expect(component.navigateToContextRoute).toEqual(jasmine.any(EventEmitter));
    expect(component.transferShipToWallet).toEqual(jasmine.any(EventEmitter));
    expect(component.transferShipToGame).toEqual(jasmine.any(EventEmitter));
  });

  it('should initialize default values', () => {
    expect(component.ships).toEqual([]);
    expect(component.disableNFTDepositBtn).toBeFalse();
    expect(component.disableWithdrawNFTBtn).toBeFalse();
    expect(component.hasWallet).toBeFalse();
    expect(component.infBalance).toBe(0);
    expect(component.isInternalRoutingEnabledComponent).toBeTrue();
  });
});
