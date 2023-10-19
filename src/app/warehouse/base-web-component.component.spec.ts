import { TranslateService } from '@ngx-translate/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseWebComponentComponent } from './base-web-component.component';

class FakeBaseWebComponentComponent extends BaseWebComponentComponent {
  isInternalRoutingEnabledComponent: boolean = false;
}

describe('BaseWebComponentComponent', () => {
  let component: BaseWebComponentComponent;
  let fixture: ComponentFixture<BaseWebComponentComponent>;
  const translateSpy = jasmine.createSpyObj('TranslateService', ['setDefaultLang', 'use']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseWebComponentComponent ],
      providers: [{ provide: TranslateService, useValue: translateSpy }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeBaseWebComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
