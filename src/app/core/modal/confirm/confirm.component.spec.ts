import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { ConfirmComponent } from './confirm.component';

describe('ConfirmComponent', () => {
  let component: ConfirmComponent,
    fixture: ComponentFixture<ConfirmComponent>,
    closeModalSpy: jasmine.Spy;

  beforeEach(async () => {
    closeModalSpy = jasmine.createSpy('closeModal');
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
      })],
      declarations: [ConfirmComponent],
      providers: [],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.closeModal).toBeUndefined();
    expect(component.data).toEqual({});
    expect(component.title).toBe('warehouse.modal.confirm.title');
    expect(component.content).toBe('warehouse.modal.confirm.content');
    expect(component.okButtonText).toBe('warehouse.modal.confirm.okButtonText');
    expect(component.cancelButtonText).toBe('warehouse.modal.confirm.cancelButtonText');
  });

  describe('ngOnInit()', () => {
    it('should set component properties from the data input', () => {
      const data = {
        title: 'foo-title',
        content: 'foo-content',
        okButtonText: 'foo-okButtonText',
        cancelButtonText: 'foo-cancelButtonText',
      }
      component.data = data;

      component.ngOnInit();

      expect(component.title).toBe(data.title);
      expect(component.content).toBe(data.content);
      expect(component.okButtonText).toBe(data.okButtonText);
      expect(component.cancelButtonText).toBe(data.cancelButtonText);
    });
  });
});
