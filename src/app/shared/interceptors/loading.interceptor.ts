import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { LoadingService } from '../service/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private totalRequests = 0;

  constructor(private loadingService: LoadingService) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.totalRequests === 0) { this.loadingService.setLoading(false); }

    this.totalRequests++;

    return next.handle(request)
      .pipe(catchError((err) => { this.loadingService.setLoading(false); return err; }))
      .pipe(map<any, any>((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) { this.stopLoader(); }
        return evt;
      }));
  }

  public stopLoader(): void {
    this.totalRequests--;
    if (this.totalRequests === 0) { this.loadingService.setLoading(false); }
  }
}