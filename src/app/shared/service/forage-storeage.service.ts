import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { User } from '../interface/user';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import * as localForage from 'localforage';
import moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class ForageStorageService {
    public _env = environment;
    public _storeDataSubject: Subject<User> = new Subject<User>();
    public _storeData: any = {
        token: '',
        token_expiration: '',
        name: '',
        email: '',
        role: '',
        id: 0
    };
    public _localForageConfig = {
        driver: [localForage.INDEXEDDB],
        name: 'session',
        version: 1.0,
        size: 4980736,
        storeName: 'data',
        description: 'OPTIMUS CUSTOMS web database'
    }

    constructor(private router: Router) {
        this._storeDataSubject.subscribe((value) => { this._storeData = value; })
    }

    public async getStorageData(): Promise<User> {
        localForage.config(this._localForageConfig);
        try {
            this._storeData = await localForage.getItem(this._env.storage);
            if (this._storeData && typeof this._storeData === 'object') {
                if (moment(this._storeData.token_expiration).isBefore(new Date())) {
                    this._storeData = this.getDefaultStorageData();
                    await this.setStorageData();
                    this.router.navigate([this._env.app.login.route]);
                    return this._storeData;
                }
                return this._storeData;
            } else {
                this._storeData = this.getDefaultStorageData();
                await localForage.setItem(this._env.storage, this._storeData);
                return this._storeData;
            }

        } catch (error) {
            this._storeData = this.getDefaultStorageData();
            await localForage.setItem(this._env.storage, this._storeData);
            return this._storeData;
        }
    }

    public async setStorageData(): Promise<boolean> {
        localForage.config(this._localForageConfig);
        try {
          await localForage.setItem(this._env.storage, this._storeData);
          return true;
        } catch (err) {
          this._storeData = this.getDefaultStorageData();
          await localForage.setItem(this._env.storage, this._storeData);
          return false;
        }
      }

    public getDefaultStorageData(): User {
        return {
            token: '',
            token_expiration: '',
            name: '',
            email: '',
            role: '',
            id: 0
        };
    }
}