import de from 'src/app/core/i18n/de.json';
import jp from 'src/app/core/i18n/jp.json';
import ko from 'src/app/core/i18n/ko.json';
import ru from 'src/app/core/i18n/ru.json';
import en from 'src/app/core/i18n/en.json';
import es from 'src/app/core/i18n/es.json';
import it from 'src/app/core/i18n/it.json';
import fr from 'src/app/core/i18n/fr.json';
import pt from 'src/app/core/i18n/pt.json';
import zhTW from 'src/app/core/i18n/zh-TW.json';
import zh from 'src/app/core/i18n/zh.json';
import { TranslateLoader } from "@ngx-translate/core";
import { Observable, of } from 'rxjs';

export class CustomTranslationLoader implements TranslateLoader {
  languages: Map<string, object>;

  constructor() {
    this.languages = new Map<string, object>([
      ['de', de],
      ['en', en],
      ['es', es],
      ['fr', fr],
      ['it', it],
      ['jp', jp],
      ['ko', ko],
      ['pt', pt],
      ['ru', ru],
      ['zh-TW', zhTW],
      ['zh', zh]
    ]);
  }

  getTranslation(language: string): Observable<object> {
    return of(this.languages.get(language) || this.languages.get('en') as object);
  }
}
