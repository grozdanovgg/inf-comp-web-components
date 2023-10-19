import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContextApiService {
  get!: <T>(path: string, options?: object) => Observable<T>;
  post!: <T>(path: string, data: object) => Observable<T>;
  put!: <T>(path: string, data: object) => Observable<T>;

  init({ get, post, put }: {
    get: <T>(path: string) => Observable<T>;
    post: <T>(path: string, data: object) => Observable<T>;
    put: <T>(path: string, data: object) => Observable<T>;
  }): void {
    this.get || (this.get = get);
    this.post || (this.post = post);
    this.put || (this.put = put);
  }
}
