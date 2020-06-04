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
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  container: HTMLElement;
  role: string;
  @Output() roleEmitter = new EventEmitter<boolean>();

  constructor(
    private auth: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.role = this.auth.currentUserSubject.value.role;
    if (this.role === 'Operator') { this.roleEmitter.emit(true); }
    if (!localStorage.getItem('authToken')) { this.router.navigate(['']); }
  }
}
