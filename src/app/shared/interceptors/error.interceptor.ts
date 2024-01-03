import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

    constructor() {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let message = '';
        let status = '';
        return next.handle(req).pipe(catchError((err) => {
            if (err) {
                message = err.error.message;
                status = err.status;
            }
            return throwError(() => { Swal.fire({ title: status, text: message, icon: 'error', confirmButtonText: 'Ok' }) });
        }));

    }
}