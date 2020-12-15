import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { catchError, map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    public currentUserSubject: BehaviorSubject<User>;
   public currentUser: Observable<User>;

   constructor(private http: HttpClient, private router: Router, private errorService: ErrorService) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserSubjectValue() {
    return this.currentUser;
  }

   public get currentUserValue(): User {
       return this.currentUserSubject.value;
   }

   register(user:User) {
    return this.http.post<any>(`${environment.apiUrl}/auth/register`, user);
 }

   login(user:User) {
       return this.http.post<any>(`${environment.apiUrl}/auth/login`, user)
           .pipe(map(user => {
               // store user details and jwt token in local storage to keep user logged in between page refreshes
               localStorage.setItem('currentUser', JSON.stringify(user));
               this.currentUserSubject.next(user);
               return user;
           })).pipe(
            catchError(this.errorService.handleError)
            );
        ;
   }

   logout() {
        return this.http.post<any>(`${environment.apiUrl}/auth/logout`,{});
   }

   getToken(){
    if(localStorage.getItem('currentUser')!=null){
       let access_token = JSON.parse(localStorage.getItem('currentUser')).access_token  
       return access_token      
    }else{
        null
    }
   }

}
