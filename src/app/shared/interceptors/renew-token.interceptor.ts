import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, filter, from, lastValueFrom, map, switchMap, take } from "rxjs";
import { environment } from "../environments/environment";
import { SessionService } from "../service/service.index";


@Injectable({
  providedIn: 'root'
})
export class RenewTokenInterceptor implements HttpInterceptor {

  private _env = environment;


  constructor(private http: HttpClient, private sessionService: SessionService) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const strContains = req.url.startsWith(this._env.app.api);
    const includeAuthUrl = req.url.includes(this._env.app.route.usuario_token_login);
    if (strContains && !includeAuthUrl) {
      return from(this.getUser()).pipe(switchMap(user => {
        const tokenExpiration = new Date(user.expiration_date);
        if (this.daysToExpiration(tokenExpiration) < 1) {
          this.renewToken(req);
        }
        return next.handle(req);
      }));
    } else {
      return next.handle(req);
    }
  }

  private async getUser() {
    return await this.sessionService.getStorageData();
  }

  private async renewToken(req: HttpRequest<any>): Promise<void> {
    var session = await this.sessionService.getStorageData();
    const url = `${this._env.app.api}${this._env.app.route.usuario_token_refresh}`;
    const headers = req.headers
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${session.token}`)
      .set('Accept-Application', '')
      .set('Accept-Data', '');
    var newToken = await lastValueFrom(this.http.post(url, session, { headers })).then((resp) => resp).catch((error) => error);

    if (newToken.status === 200) {
      this.sessionService.setStorageData(newToken.body);
    }

  }

  private daysToExpiration(expirationDate: Date): number {
    const msInDay = 24 * 60 * 60 * 1000;
    return Math.round(
      Math.abs(new Date().getTime() - expirationDate.getTime()) / msInDay
    );
  }

}