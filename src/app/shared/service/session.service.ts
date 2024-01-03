import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    public _env = environment;

    constructor() { }

    public async getStorageData(): Promise<any> {
        var session: any = await localStorage.getItem(this._env.storage);
        
        return session;
    }

    public async setStorageData(session: any): Promise<boolean> {
        localStorage.setItem(this._env.storage, session);
        console.log(session);
        return true;
    }

    public async clearSession() {
        localStorage.clear();
    }
}