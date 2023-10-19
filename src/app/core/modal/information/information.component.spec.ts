import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  TranslateLoader,
  TranslateModule,
  TranslateFakeLoader,
} from '@ngx-translate/core';
import { popupIcons } from 'src/app/core/modal/assets';
import { InformationComponent } from './information.component';

describe('InformationComponent', () => {
  let component: InformationComponent;
  let fixture: ComponentFixture<InformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
      declarations: [InformationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.closeModal).toBeUndefined();
    expect(component.data).toEqual({});
    expect(component.title).toBe('warehouse.modal.information.title');
    expect(component.sections).toEqual([{ subTitle: '', text: [''] }]);
    expect(component.icons).toEqual(popupIcons);
  });

  describe('ngOnInit()', () => {
    it('should set component properties from the data input', () => {
      const data = {
        title: 'foo-title',
        sections: [{ subTitle: 'foo-section-title', text: ['foo-section-text'] }]
      }
      component.data = data;

      component.ngOnInit();

      expect(component.title).toBe(data.title);
      expect(component.sections).toBe(data.sections);
    });
  });
});
