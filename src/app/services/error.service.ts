import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http'
import { throwError } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class ErrorService implements ErrorHandler{
 constructor() { }

 handleError(error: HttpErrorResponse) {
     return throwError(error);
  }
}
