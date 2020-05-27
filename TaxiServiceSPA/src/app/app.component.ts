import { Component, AfterViewChecked, OnInit, Input } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Taxi Service';
  sideBar = this.auth.userData.value.role === 'Operator' ? true : false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}


}
