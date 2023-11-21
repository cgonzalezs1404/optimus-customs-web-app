import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private isBusy: boolean = false;

  constructor() { }

  public setLoading(isBusy: boolean){
    this.isBusy = isBusy
  }

  public getLoading():boolean{
    return this.isBusy;
  }
}
