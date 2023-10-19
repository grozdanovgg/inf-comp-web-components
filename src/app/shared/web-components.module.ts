import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { initialize } from "@ionic/core/components";
import { IonButton } from "@ionic/core/components/ion-button";
import { IonCard } from "@ionic/core/components/ion-card";
import { IonCardContent } from "@ionic/core/components/ion-card-content";
import { IonCardHeader } from "@ionic/core/components/ion-card-header";
import { IonCardSubtitle } from "@ionic/core/components/ion-card-subtitle";
import { IonCardTitle } from "@ionic/core/components/ion-card-title";
import { IonInput } from "@ionic/core/components/ion-input";
import { IonProgressBar } from '@ionic/core/components/ion-progress-bar';
import { IonItem } from '@ionic/core/components/ion-item';
import { IonLabel } from '@ionic/core/components/ion-label';

@NgModule({
  declarations: [],
  exports: [],
  imports: [
    CommonModule
  ]
})
export class WebComponentsModule {
  constructor() {

    // Should use the default ionic names to fully utilize their styles
    customElements.get('ion-button')
      ? console.warn('The element ion-button is already registered, skipping registration')
      : customElements.define('ion-button', IonButton);

    customElements.get('ion-item')
      ? console.warn('The element ion-item is already registered, skipping registration')
      : customElements.define('ion-item', IonItem);

    customElements.get('ion-label')
      ? console.warn('The element ion-label is already registered, skipping registration')
      : customElements.define('ion-label', IonLabel);

    customElements.get('ion-input')
      ? console.warn('The element ion-input is already registered, skipping registration')
      : customElements.define('ion-input', IonInput);

    customElements.get('ion-card')
      ? console.warn('The element ion-card is already registered, skipping registration')
      : customElements.define('ion-card', IonCard);

    customElements.get('ion-card-content')
      ? console.warn('The element ion-card-content is already registered, skipping registration')
      : customElements.define('ion-card-content', IonCardContent);

    customElements.get('ion-card-header')
      ? console.warn('The element ion-card-header is already registered, skipping registration')
      : customElements.define('ion-card-header', IonCardHeader);

    customElements.get('ion-card-subtitle')
      ? console.warn('The element ion-card-subtitle is already registered, skipping registration')
      : customElements.define('ion-card-subtitle', IonCardSubtitle);

    customElements.get('ion-card-title')
      ? console.warn('The element ion-card-title is already registered, skipping registration')
      : customElements.define('ion-card-title', IonCardTitle);

    customElements.get('ion-progress-bar')
      ? console.warn('The element ion-progress-bar is already registered, skipping registration')
      : customElements.define('ion-progress-bar', IonProgressBar);

    initialize();
  }
}
