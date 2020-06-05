import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { User } from 'src/models/user';
import { AuthService } from '../services/auth.service';
import { Client } from 'src/interfaces/models/client';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public dialogRef: MatDialogRef<LoginComponent>;
  public user: User;
  public client: Client;

  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    private http: HttpClient,
  ) {
    auth.currentUser.subscribe(user => this.user = user);
  }

  ngOnInit() {
    this.getClient();
  }

  openDialog() {
    this.dialogRef = this.dialog.open(LoginComponent);
  }

  logout() {
    this.auth.logout();
  }

  getClient() {
    this.http.post<Client>(environment.baseUrl + 'api/clients/phone', { phone: '0979623717' }).subscribe(result => {
        this.client = result;
        console.log(this.client);
      });
  }
}
