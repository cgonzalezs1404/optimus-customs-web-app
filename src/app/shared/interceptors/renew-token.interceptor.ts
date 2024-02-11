import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, from, lastValueFrom, switchMap, } from "rxjs";
import { environment } from "../environments/environment";
import { SessionService } from "../service/service.index";


@Injectable({
  providedIn: 'root'
})
export class RenewTokenInterceptor implements HttpInterceptor {

  private _env = environment;
  private _isRefreshing = false;

  constructor(private http: HttpClient, private sessionService: SessionService) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const strContains = req.url.startsWith(this._env.app.api);
    const includeAuthUrl = req.url.includes(this._env.app.route.usuario_token_login);
    if (strContains && !includeAuthUrl && !this._isRefreshing) {
      this._isRefreshing = true;
      return from(this.getUser()).pipe(switchMap(user => {
        
        const tokenExpiration = new Date(user.expiration_date);
        if (this.daysToExpiration(tokenExpiration) <= 1) {
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
      console.log(req);
      var session = await this.sessionService.getStorageData();
      const url = `${this._env.app.api}${this._env.app.route.usuario_token_refresh}`;
  
      var newToken = await lastValueFrom(this.http.post(url, session)).then((resp) => resp).catch((error) => error);
      if (newToken) {
        await this.sessionService.setStorageData(newToken);
        this._isRefreshing = false;
      }
  }

  private daysToExpiration(expirationDate: Date): number {
    const msInDay = 24 * 60 * 60 * 1000;
    return Math.round(
      Math.abs(new Date().getTime() - expirationDate.getTime()) / msInDay
    );
  }

}