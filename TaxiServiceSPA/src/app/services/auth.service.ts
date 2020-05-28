import { Injectable } from '@angular/core';
import { User } from 'src/models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserSubject = new BehaviorSubject<User>(new User());
  currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.setUserDetails();
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(userDetails) {
    return this.http
      .post<any>(environment.baseUrl + 'auth/login', userDetails)
      .pipe(
        map((response) => {
          localStorage.setItem('authToken', response.token);
          this.setUserDetails();
          return response;
        })
      );
  }

  setUserDetails() {
    if (localStorage.getItem('authToken')) {
      const userDetails = new User();
      const decodeUserDetails = JSON.parse(
        window.atob(localStorage.getItem('authToken').split('.')[1])
      );
      userDetails.username = decodeUserDetails.unique_name;
      userDetails.isLoggedIn = true;
      userDetails.role = decodeUserDetails.role;

      this.currentUserSubject.next(userDetails);
    }
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate([environment.baseUrl + 'login']);
    this.currentUserSubject.next(new User());
  }
}
