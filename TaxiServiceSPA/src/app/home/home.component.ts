import {
  Component,
  OnInit,
  AfterViewChecked,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterOutlet, ActivationStart } from '@angular/router';
import { User } from 'src/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  container: HTMLElement;
  user: User;
  @Output() roleEmitter = new EventEmitter<boolean>();

  constructor(
    private auth: AuthService,
    private router: Router) {
      auth.currentUser.subscribe(x => this.user = x);
    }

  ngOnInit() {
    this.user.role = this.auth.currentUserSubject.value.role;
  }
}
