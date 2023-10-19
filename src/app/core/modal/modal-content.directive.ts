import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appModalAnchor]'
})
export class ModalContentDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
