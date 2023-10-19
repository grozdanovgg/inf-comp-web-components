import { TranslateService } from '@ngx-translate/core';
import { TestBed } from '@angular/core/testing';
import { LocalizationService } from './localization.service';

describe('LocalizationService', () => {
  let service: LocalizationService,
    translate: TranslateService;

  beforeEach(() => {
    const translateSpy = jasmine.createSpyObj('TranslateService', ['setDefaultLang', 'use']);

    TestBed.configureTestingModule({
      providers: [
        LocalizationService,
        { provide: TranslateService, useValue: translateSpy }
      ]
    });

    translate = TestBed.inject(TranslateService) as jasmine.SpyObj<TranslateService>;
    service = TestBed.inject(LocalizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('constructor', () => {
    it('should configure translations', () => {
      expect(translate.setDefaultLang).toHaveBeenCalledWith('en');
    });
  });

  describe('use()', () => {
    it('call translate.use()', () => {
      service.use('foo');

      expect(translate.use).toHaveBeenCalledWith('foo');
    });
  });
});
