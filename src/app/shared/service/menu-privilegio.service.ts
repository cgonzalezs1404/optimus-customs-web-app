import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MenuPrivilegioService {

  private _env = environment;
  constructor(private http: HttpClient) { }

  public async getData(filters: string): Promise<any> {
    const url = `${this._env.app.api}${this._env.app.route.menu_x_privilegio}${filters}`;
    return await lastValueFrom(this.http.get(url, { observe: 'response' }).pipe(map((resp) => { return resp; })));
  }

  public async getDataById(id: any): Promise<any> {
    const url = `${this._env.app.api}${this._env.app.route.menu_x_privilegio}/${id}`;
    return await lastValueFrom(this.http.get(url, { observe: 'response' }).pipe(map((resp) => { return resp; })));
  }

  public async postData(payload: any): Promise<any> {
    const url = `${this._env.app.api}${this._env.app.route.menu_x_privilegio}`;
    return await lastValueFrom(this.http.post(url, payload, { observe: 'response' }).pipe(map((resp) => { return resp; })));
  }

  public async putData(id: any, payload: any): Promise<any> {
    const url = `${this._env.app.api}${this._env.app.route.menu_x_privilegio}/${id}`;
    return await lastValueFrom(this.http.put(url, payload, { observe: 'response' }).pipe(map((resp) => { return resp; })));
  }

  public async deleteData(id: any): Promise<any> {
    const url = `${this._env.app.api}${this._env.app.route.menu_x_privilegio}/${id}`;
    return await lastValueFrom(this.http.delete(url, { observe: 'response' }).pipe(map((resp) => { return resp; })));
  }
}
