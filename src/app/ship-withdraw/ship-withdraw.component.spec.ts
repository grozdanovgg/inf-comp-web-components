import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule
} from '@ngx-translate/core';

import { Ship } from 'src/app/model/ship';
import { arrowIcons } from 'src/app/ship-withdraw/assets';
import { environment } from 'src/environments/environment';
import { ShipWithdrawComponent } from './ship-withdraw.component';

describe('ShipWithdrawComponent', () => {
  let component: ShipWithdrawComponent;
  let fixture: ComponentFixture<ShipWithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
        RouterTestingModule
      ],
      declarations: [ShipWithdrawComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipWithdrawComponent);
    component = fixture.componentInstance;
    component.ship = {} as Ship;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.ship).toEqual({} as Ship);
    expect(component.navigateToWarehouse).toEqual(jasmine.any(EventEmitter));
    expect(component.withdrawRequest).toEqual(jasmine.any(EventEmitter));
    expect(component.isInternalRoutingEnabledComponent).toBeFalse();
    expect(component.NFTExplorerEndpoint).toBe(environment.NFTExplorerEndpoint);
    expect(component.icons).toEqual(arrowIcons);
  });

  describe('requestWithdraw()', () => {
    it('should emit the vent with the wallet address', () => {
      spyOn(component.withdrawRequest, 'emit');

      component.requestWithdraw();

      expect(component.withdrawRequest.emit).toHaveBeenCalledOnceWith();
    });
  });

  describe('close()', () => {
    it('should emit from navigateToWarehouse emitter', () => {

      spyOn(component.navigateToWarehouse, 'emit');

      component.close();

      expect(component.navigateToWarehouse.emit).toHaveBeenCalledOnceWith();
    });
  });
});
