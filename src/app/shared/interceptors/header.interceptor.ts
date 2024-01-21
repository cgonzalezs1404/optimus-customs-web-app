import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, from, switchMap } from "rxjs";
import { environment } from "../environments/environment";
import { SessionService } from "../service/session.service";

@Injectable({
    providedIn: 'root'
})
export class HeaderInterceptor implements HttpInterceptor {

    public _env = environment;

    constructor(private sessionService: SessionService) {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const strContains = req.url.startsWith(this._env.app.api);
        const includeAuthUrl = req.url.includes(this._env.app.route.usuario_token_login);
        const inclideFileUrl = req.url.includes(this._env.app.route.factura_archivo);
        if (strContains && !includeAuthUrl) {

            if (inclideFileUrl) {
                return from(this.getUser()).pipe(switchMap(user => {
                    const headers = req.headers
                        .set('Authorization', `Bearer ${user.token}`)
                        .set('Accept', 'application/json');
                    const httpRequestClone = req.clone({ headers });
                    return next.handle(httpRequestClone);
                }));
            } else {
                return from(this.getUser()).pipe(switchMap(user => {
                    const headers = req.headers
                        .set('Authorization', `Bearer ${user.token}`)
                        .set('Content-Type', 'application/json');
                    const httpRequestClone = req.clone({ headers });
                    return next.handle(httpRequestClone);
                }));
            }
        } else {
            return next.handle(req);
        }
    }

    private async getUser(): Promise<any> {
        return await this.sessionService.getStorageData();
    }
}