import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, map } from 'rxjs';
import * as service from './service.index';

@Injectable({
  providedIn: 'root'
})
export class FacturaArchivoService {

  private _env = environment;
  constructor(
    private http: HttpClient
    , private userSession: service.SessionService) { }

  public async getData(filter: any): Promise<any> {
    const url = `${this._env.app.api}/${this._env.app.route.factura_archivo}${filter}`;
    return await lastValueFrom(this.http.get(url, { observe: 'response' }).pipe(map((resp: any) => { return resp; })));
  }

  public async getDataById(id: any): Promise<any> {
    const url = `${this._env.app.api}/${this._env.app.route.factura_archivo}/${id}`;
    return await lastValueFrom(this.http.get(url, { observe: 'response' }).pipe(map((resp: any) => { return resp; })));
  }

  public async postData(payload: any): Promise<any> {
    const url = `${this._env.app.api}/${this._env.app.route.factura_archivo}`;
    return await lastValueFrom(this.http.post(url, payload, { observe: 'response', reportProgress: true }).pipe(map((resp: any) => { return resp; })));
  }

  public async putData(id: any, payload: any): Promise<any> {
    const url = `${this._env.app.api}${this._env.app.route.factura_archivo}/${id}`;
    return await lastValueFrom(this.http.put(url, payload, { headers: new HttpHeaders().set('content-type', 'multipart/form-data'), observe: 'response', reportProgress: true }).pipe(map((resp: any) => { return resp; })));
  }

  public async deleteData(id: any): Promise<any> {
    const url = `${this._env.app.api}/${this._env.app.route.factura_archivo}/${id}`;
    return await lastValueFrom(this.http.delete(url, { observe: 'response' }).pipe(map((resp: any) => { return resp; })));
  }
}
