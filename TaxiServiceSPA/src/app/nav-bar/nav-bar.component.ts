import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  dialogRef: MatDialogRef<LoginDialogComponent>;
  @Output() public role = new EventEmitter();

  constructor(private dialog: MatDialog) { }

  openDialog() {
    this.dialogRef = this.dialog.open(LoginDialogComponent);
  }

  ngOnInit() {
  }
}
