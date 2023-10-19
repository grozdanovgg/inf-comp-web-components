import { ViewContainerRef } from '@angular/core';
import { ModalContentDirective } from './modal-content.directive';

describe('ModalContentDirective', () => {
  it('should create an instance', () => {
    const directive = new ModalContentDirective({} as ViewContainerRef);
    expect(directive).toBeTruthy();
  });
});
