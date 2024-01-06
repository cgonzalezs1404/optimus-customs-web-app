import { Injectable } from '@angular/core';
import { environment } from '../shared/environments/environment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private _env = environment;

  constructor(private http: HttpClient) { }

  public async get(filters: string): Promise<any> {
    const url = `${this._env.app.api}${this._env.app.route.estado}${filters}`;
    return await lastValueFrom(this.http.get(url, { observe: 'response' }).pipe(map((resp) => { return resp; })));
  }
}
