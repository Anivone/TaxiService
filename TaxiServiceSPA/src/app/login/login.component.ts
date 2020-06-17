import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { first } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading = false;
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;

  private title: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public dialogRef: MatDialogRef<LoginComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.title = this.data;
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    if (localStorage.getItem('authToken')) {
      this.router.navigate(['home']);
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    const returnUrl =
      this.route.snapshot.queryParamMap.get('returnUrl') || 'home';
    this.authService
      .login(this.loginForm.value)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate([returnUrl]);
          this.close();
        },
        () => {
          this.loading = false;
          this.loginForm.reset();
          this.loginForm.setErrors({
            invalidLogin: true,
          });
        }
      );
  }

  openRegister() {
    const dialogReg = this.dialog.open(RegisterComponent, {
      autoFocus: true
    });
  }

  close() {
    this.dialogRef.close();
  }
}
