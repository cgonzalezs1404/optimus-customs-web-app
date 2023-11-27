import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioTokenService {

  private _env = environment;

  constructor(private httpClient: HttpClient) { }

  public async login(payload: any): Promise<any> {
    const url = `${this._env.app.api}${this._env.app.route.usuario_token_login}`;
    return await lastValueFrom(this.httpClient.post(url, payload, { observe: 'response' }).pipe(map((resp: any) => { return resp; })));
  }

  public async refresh(payload: any): Promise<any> {
    const url = `${this._env.app.api}${this._env.app.route.usuario_token_refresh}`;
    return await lastValueFrom(this.httpClient.post(url, payload, { observe: 'response' }).pipe(map((resp: any) => { return resp; })));
  }
}
