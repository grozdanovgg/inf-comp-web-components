import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }

  use(language: string): void {
    this.translate.use(language);
  }
}
