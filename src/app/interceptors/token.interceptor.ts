import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
   } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';   
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
              'Content-Type' : 'application/json; charset=utf-8',
              'Accept'       : 'application/json',
              'Authorization': `Bearer ${this.authService.getToken()}`,
            },
          });
      
          return next.handle(request);      
    }
   
   }