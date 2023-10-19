import { HttpClientModule } from '@angular/common/http';
import {
  ApplicationRef,
  CUSTOM_ELEMENTS_SCHEMA,
  DoBootstrap,
  Injector,
  NgModule,
} from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { customElementsMap, rootWebComponentModules } from 'src/app/build-config/root-web-components-config';
import { CustomTranslationLoader } from 'src/app/core/translation-loaoder';
import { environment } from 'src/environments/environment';
import { AppComponentComponent } from './app-component.component';

// Factory function required during AOT compilation
export function customTranslationLoaderFactory() {
  return new CustomTranslationLoader();
}
@NgModule({
  declarations: [AppComponentComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: customTranslationLoaderFactory,
      },
    }),
    ...rootWebComponentModules
  ],
  entryComponents: [AppComponentComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) { }

  ngDoBootstrap(appRef: ApplicationRef) {
    Array.from(customElementsMap.keys()).forEach((customElementName) => {
      const customElementComponent = customElementsMap.get(customElementName);

      if (customElementComponent) {
        if (!customElements.get(customElementName)) {
          const customElement = createCustomElement(customElementComponent, { injector: this.injector });
          customElements.define(customElementName, customElement);
          console.info(`Successfully registered ${customElementName} as custom-element`);
        } else {
          console.warn(`The custom-element ${customElementName} is already registered, skipping registration`);
        }
      }
    });

    if (!environment.production) {
      appRef.bootstrap(AppComponentComponent);
    }
  }
}
