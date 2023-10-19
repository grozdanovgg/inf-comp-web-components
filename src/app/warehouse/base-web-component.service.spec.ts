import { TestBed } from '@angular/core/testing';

import { BaseWebComponentService } from './base-web-component.service';

describe('BaseWebComponentService', () => {
  let service: BaseWebComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseWebComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
