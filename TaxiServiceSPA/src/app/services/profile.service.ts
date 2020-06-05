import { Injectable } from '@angular/core';
import { Client } from 'src/interfaces/models/client';
import { Operator } from 'src/interfaces/models/operator';
import { Driver } from 'src/interfaces/models/driver';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public user: User;
  constructor(
    private http: HttpClient) {
  }

  public getClient() {
    return this.http.post<Client>(environment.baseUrl + 'api/clients/phone', { phone: '0979623717' });
  }

  public getOperator() {
    return this.http.post<Operator>(environment.baseUrl + 'api/operators/phone', { phone: '0979623717' });
  }

  public getDriver() {
    return this.http.post<Driver>(environment.baseUrl + 'api/drivers/phone', { phone: '0979623717' });
  }

}
