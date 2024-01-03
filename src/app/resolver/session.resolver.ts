
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
        if(!session){
            this.router.navigate([this._env.app.login.route]);
        }

        if(new Date(session.expiration_date) < new Date()){
            this.router.navigate([this._env.app.login.route]);
        }
        // return await this.storageServ.getStorageData()
        //     .then((resp) => {
        //         if (!resp) {
        //             
        //         }
        //         if (new Date(resp.expiration_date) < new Date()) {
        //             this.router.navigate([this._env.app.login.route]);
        //         }
        //     })
        //     .catch(((error) => {
        //         this.router.navigate([this._env.app.login.route]);
        //         return EMPTY;
        //     }));
        // return await this.authServ.session(`?id_usuario=1&activo=1`)
        //     .then((resp) => {

        //         if (resp.status !== 200) {
        //             this.router.navigate([this._env.app.login.route]);
        //         }
        //         if (!resp.body) {
        //             this.router.navigate([this._env.app.login.route]);
        //         }
        //         if(new Date(resp.body.expiration_date) < new Date()){
        //             this.router.navigate([this._env.app.login.route]);
        //         }

        //     }).catch((error) => {
        //         this.router.navigate([this._env.app.login.route]);
        //         return EMPTY;
        //     });

    }
}
