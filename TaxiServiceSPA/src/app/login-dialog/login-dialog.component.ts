import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/interfaces/dialogdata';


@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
  ) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
}
