import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule, TranslateFakeLoader } from '@ngx-translate/core';

import { NotificationComponent } from './notification.component';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
      })],
      declarations: [NotificationComponent],
      providers: []
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.closeModal).toBeUndefined();
    expect(component.data).toEqual({});
    expect(component.title).toBe('warehouse.modal.notification.title');
    expect(component.content).toBe('warehouse.modal.notification.content');
    expect(component.buttonText).toBe('warehouse.modal.notification.buttonText');
  });

  describe('ngOnInit()', () => {
    it('should set component properties from the data input', () => {
      const data = {
        title: 'foo-title',
        content: 'foo-content',
        buttonText: 'foo-buttonText',
      }
      component.data = data;

      component.ngOnInit();

      expect(component.title).toBe(data.title);
      expect(component.content).toBe(data.content);
      expect(component.buttonText).toBe(data.buttonText);
    });
  });
});
