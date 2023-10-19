import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule
} from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ContextApiService } from 'src/app/core/context-api.service';
import { BaseWebComponentComponent } from 'src/app/warehouse/base-web-component.component';
import { ShipDepositComponent } from './ship-deposit.component';

describe('ShipDepositComponent', () => {
  let component: ShipDepositComponent;
  let fixture: ComponentFixture<ShipDepositComponent>;
  let contextApiServiceSpy: jasmine.SpyObj<ContextApiService>;
  let depositAddressResponseSpy: jasmine.SpyObj<Observable<unknown>>;
  BaseWebComponentComponent.prototype.ngOnInit = jasmine.createSpy('ngOnInit');

  beforeEach(async () => {
    contextApiServiceSpy = jasmine.createSpyObj('ContextApiService', ['get']);
    depositAddressResponseSpy = jasmine.createSpyObj(
      'GetDepositAddressResponse',
      ['subscribe']
    );

    contextApiServiceSpy.get.and.returnValue(depositAddressResponseSpy);

    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
      declarations: [ShipDepositComponent],
      providers: [
        { provide: ContextApiService, useValue: contextApiServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.walletAddress).toBe('');
    expect(component.toggleTooltip).toBe(false);
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      spyOn(ShipDepositComponent.prototype, 'ngOnInit').and.callThrough();
      spyOn(ShipDepositComponent.prototype, 'checkIfImageExists' as never);
    });

    it('should call super.ngOnInit()', () => {
      component.ngOnInit();

      expect(ShipDepositComponent.prototype.ngOnInit).toHaveBeenCalledOnceWith();
    });

    it('should call checkIfImageExists', () => {
      component.ngOnInit();

      expect(component['checkIfImageExists']).toHaveBeenCalledOnceWith(
        './assets/images/base_qr_code.png',
        jasmine.any(Function));
    });
  });

  describe('close()', () => {
    it('should emit from navigateToWarehouse emitter', () => {

      spyOn(component.navigateToWarehouse, 'emit');

      component.close();

      expect(component.navigateToWarehouse.emit).toHaveBeenCalledOnceWith();
    });
  });

  describe('copyToClipboard()', () => {
    beforeEach(() => {
      spyOn(navigator.clipboard, 'writeText');
    });

    it('should toggle tooltip and write text to clipboard', () => {
      component.walletAddress = 'foo-address';
      component.copyToClipboard();

      expect(component.toggleTooltip).toBeTrue();

      expect(navigator.clipboard.writeText).toHaveBeenCalledOnceWith('foo-address');
    });

    it('should write to clipboard an empty string if the walletAddress is undefined', () => {
      component.copyToClipboard();

      expect(component.toggleTooltip).toBeTrue();

      expect(navigator.clipboard.writeText).toHaveBeenCalledOnceWith('');
    });
  });
});
