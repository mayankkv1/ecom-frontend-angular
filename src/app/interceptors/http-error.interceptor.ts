import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse   
   } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';   
import { retry, catchError } from 'rxjs/operators';
@Injectable()      
export class HttpErrorInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request)
        .pipe(
          retry(1),   
          catchError((error: HttpErrorResponse) => {   
            console.log(error);   
            return throwError(error);
          })
        ) 
    }
   
   }