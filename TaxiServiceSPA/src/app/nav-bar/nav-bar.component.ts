import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { User } from 'src/models/user';
import { AuthService } from '../services/auth.service';
import { Client } from 'src/interfaces/models/client';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';
import { Operator } from 'src/interfaces/models/operator';
import { Driver } from 'src/interfaces/models/driver';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public dialogRef: MatDialogRef<LoginComponent>;
  public user: User;

  public client: Client;
  public operator: Operator;
  public driver: Driver;

  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    private http: HttpClient,
    private router: Router
  ) {
    auth.currentUser.subscribe(user => {
      this.user = user;
      if (this.user.role === 'Client') { this.getClient(); }
      if (this.user.role === 'Operator') { this.getOperator(); }
      if (this.user.role === 'Driver') { this.getDriver(); }
    });
  }

  ngOnInit() {
  }

  openDialog() {
    this.dialogRef = this.dialog.open(LoginComponent);
  }

  logout() {
    this.router.navigateByUrl(environment.baseUrl + 'home');
    this.auth.logout();
  }

  getClient() {
    this.http.post<Client>(environment.baseUrl + 'api/clients/phone', { phone: this.user.username }).subscribe(result => {
      this.client = result;
      console.log(this.client);
    });
  }
  getOperator() {
    this.http.post<Operator>(environment.baseUrl + 'api/operators/phone', { phone: this.user.username }).subscribe(result => {
      this.operator = result;
      console.log(this.operator);
    });
  }
  getDriver() {
    console.log('phone: ', this.user.username);
    this.http.post<Driver>(environment.baseUrl + 'api/drivers/phone', { phone: this.user.username }).subscribe(result => {
      this.driver = result;
      console.log(this.driver);
    });
  }
}
