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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  container: HTMLElement;
  role: string;
  @Output() roleEmitter = new EventEmitter<boolean>();

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.role = this.auth.userData.value.role;
    if (this.role === 'Operator') { this.roleEmitter.emit(true); }
  }
}
