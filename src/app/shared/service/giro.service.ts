import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { lastValueFrom, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GiroService {

  private _env = environment;

  constructor(private http: HttpClient) { }

  public async getData(filters: string): Promise<any> {
    const url = `${this._env.app.api}${this._env.app.route.giro}${filters}`;
    return await lastValueFrom(this.http.get(url, { observe: 'response' }).pipe(map((resp) => { return resp; })));
  }
}
