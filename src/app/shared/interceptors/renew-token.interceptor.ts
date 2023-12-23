import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, filter, from, lastValueFrom, map, switchMap, take } from "rxjs";
import { environment } from "../environments/environment";
import { ForageStorageService } from "../service/service.index";
import { User } from "../interface/user";
import moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class RenewTokenInterceptor implements HttpInterceptor {

  private _env = environment;
  private _appUser: User;
  private _isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private storageServ: ForageStorageService) {
    this._appUser = storageServ.getDefaultStorageData();
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith(this._env.app.api)
      && !req.url.includes(this._env.app.route.usuario_token_login)) {
      return from(this.getUser()).pipe(switchMap(optcustUser => {
        this._appUser = optcustUser;
        const tokenExpiration = moment(optcustUser.token_expiration);
        const currentDate = moment.utc();
        if (tokenExpiration.diff(currentDate, 'days') <= 1) {
          return this.renewAccessToken(req, next);
        }
        return next.handle(req);
      }));
    } else {
      return next.handle(req);
    }
  }

  private async getUser(): Promise<User> {
    return await this.storageServ.getStorageData();
  }

  private async updateUser(data: any): Promise<boolean> {
    this._appUser.token = data.token;
    this._appUser.token_expiration = data.expiration;

    this.storageServ._storeDataSubject.next(this._appUser);
    return await this.storageServ.setStorageData();
  }

  private renewAccessToken(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this._isRefreshing) {
      this._isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return from(this.getData(httpRequest)).pipe(
        switchMap((response: any) => {
          return from(this.updateUser(response.data)).pipe(switchMap((updated: any) => {
            this._isRefreshing = false;
            this.refreshTokenSubject.next(this._appUser.token);
            return next.handle(this.retryRequest(httpRequest, this._appUser.token));
          }));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.retryRequest(httpRequest, jwt));
        }));
    }
  }

  private async getData(httpRequest: HttpRequest<any>): Promise<any> {
    this._appUser = await this.storageServ.getStorageData();
    const url = `${this._env.app.api}/${this._env.app.route.usuario_token_refresh}`;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', httpRequest.headers.get('Authorization') || `Bearer ${this._appUser.token}`)
      .set('Accept-Language', httpRequest.headers.get('Accept-Language') || 'es-mx')
      .set('Accept-Application', httpRequest.headers.get('Accept-Application') || '1')
      .set('Accept-Data', httpRequest.headers.get('Accept-Data') || '');

    return await lastValueFrom(this.http.get(url, { headers }).pipe(map((resp: any) => { return resp; })));
  }

  private retryRequest(request: HttpRequest<any>, token: any): HttpRequest<any> {
    const req = request.clone({ setHeaders: {} });
    const newHeaderMap = [];
    for (const headerName of request.clone().headers.keys()) {
      if (headerName === 'Authorization') { newHeaderMap.push([headerName, `Bearer ${token}`]); }
      else { newHeaderMap.push([headerName, request.clone().headers.get(headerName)]); }
    }
    const newHeader = Object.fromEntries(newHeaderMap);
    const finalReq = req.clone({ setHeaders: newHeader });
    return finalReq;
  }

}