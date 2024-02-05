
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { environment } from '../shared/environments/environment'
import * as service from '../shared/service/service.index';
import { EMPTY } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SessionResolver implements Resolve<any> {
    public _env = environment;
    public _appUser: any;

    constructor(
        private storageServ: service.SessionService,
        private authServ: service.UsuarioTokenService,
        public router: Router,
    ) {
        //this._appUser = storageServ.getStorageData();
    }

    public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {

        var session = await this.storageServ.getStorageData();
        if (JSON.stringify(session) === '{}') {
            this.storageServ.clearSession();
            this.router.navigate([this._env.app.login.route]);
        }
        if (!session) {
            this.router.navigate([this._env.app.login.route]);
        }
        if (new Date(session.expiration_date) < new Date()) {
            this.router.navigate([this._env.app.login.route]);
        }
    }
}
