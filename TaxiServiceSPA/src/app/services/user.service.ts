import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  operator() {
    return this.http
      .get(environment.baseUrl + 'user/operator')
      .pipe(map((result) => result));
  }

  driver() {
    return this.http
      .get(environment.baseUrl + 'user/driver')
      .pipe(map((result) => result));
  }

  client() {
    return this.http
      .get(environment.baseUrl + 'user/client')
      .pipe(map((result) => result));
  }
}
