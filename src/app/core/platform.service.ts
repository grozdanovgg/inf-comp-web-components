import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, isPlatformServer} from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class PlatformService {

    constructor(
        @Inject(PLATFORM_ID) private platformId:any
    ) {
    }

    getPlatformId() {
        return this.platformId;
    }

    isBrowser() {
        return isPlatformBrowser(this.platformId);
    }

    isServer() {
        return isPlatformServer(this.platformId);
    }
}
