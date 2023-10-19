import { TestBed } from '@angular/core/testing';

import { ContextApiService } from './context-api.service';

describe('ContextApiService', () => {
  let service: ContextApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContextApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('init()', () => {
    it('set the "get", "post", and "put" callbacks', () => {
      const fooGet = () => { };
      const fooPost = () => { };
      const fooPut = () => { };
      const fooApiCallbacks = {
        get: fooGet,
        post: fooPost,
        put: fooPut
      };

      // @ts-ignore
      service.init(fooApiCallbacks);
      expect(service.get).toBe(fooGet);
      expect(service.post).toBe(fooPost);
      expect(service.put).toBe(fooPut);
    });
  });
});
