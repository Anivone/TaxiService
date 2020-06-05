import { Component, AfterViewChecked, OnInit, Input } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Taxi Service';

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.validateToken();
  }

  validateToken() {
    if (!localStorage.getItem('authToken')) { return; }

    const token = JSON.parse(
      window.atob(localStorage.getItem('authToken').split('.')[1])
    );
    if (Date.now() > token.exp * 1000) {
      this.auth.logout();
    }

    const timeLeft = token.exp * 1000 - Date.now();
    console.log('time left: ', timeLeft);
  }
}
