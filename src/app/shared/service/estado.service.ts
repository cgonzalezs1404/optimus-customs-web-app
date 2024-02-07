import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private _env = environment;
  constructor(private http: HttpClient) { }

  public async getData(filters: string): Promise<any> {
    const url = `${this._env.app.api}${this._env.app.route.estado}${filters}`;
    return await lastValueFrom(this.http.get(url, { observe: 'response' }).pipe(map((resp) => { return resp; })));
  }

  public async getDataById(id: any): Promise<any> {
    const url = `${this._env.app.api}${this._env.app.route.estado}/${id}`;
    return await lastValueFrom(this.http.get(url, { observe: 'response' }).pipe(map((resp) => { return resp; })));
  }

  public async postData(payload: any): Promise<any> {
    const url = `${this._env.app.api}${this._env.app.route.estado}`;
    return await lastValueFrom(this.http.post(url, payload, { observe: 'response' }).pipe(map((resp) => { return resp; })));
  }

  public async putData(id: any, payload: any): Promise<any> {
    const url = `${this._env.app.api}${this._env.app.route.estado}/${id}`;
    return await lastValueFrom(this.http.put(url, payload, { observe: 'response' }).pipe(map((resp) => { return resp; })));
  }

  public async deleteData(id: any): Promise<any> {
    const url = `${this._env.app.api}${this._env.app.route.estado}/${id}`;
    return await lastValueFrom(this.http.delete(url, { observe: 'response' }).pipe(map((resp) => { return resp; })));
  }
}
