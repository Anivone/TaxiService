import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserToRegister } from 'src/interfaces/models/userToRegister';
import { MyErrorStateMatcher } from 'src/app/add-page/client-add-page/client-add-page.component';
import { Client } from 'src/interfaces/models/client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  get primEmail() {
    return this.userForm.get('primaryEmail');
  }
  userForm: FormGroup;
  equal = true;
  hide = true;
  hide1 = true;

  constructor(
    private forrmBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.userForm = this.forrmBuilder.group({

      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      personalPhone: (['', Validators.pattern('^[0-9]{10,10}$')]),
      creditCard: [''],
      primaryEmail: new FormControl('', [
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      password: [null, [Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*)[A-Za-z].{8,}')]],
      confirmPassword: [null, [Validators.required]]
    });

  }

  isEqual(): void {

    if (!(this.userForm.value.password === this.userForm.value.confirmPassword)) {
      this.userForm.controls.confirmPassword.setErrors({ unEqual: true });
    }
  }

  getCurrentDate(): string {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().length === 1 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    const day = date.getDate().toString().length === 1 ? `0${date.getDate()}` : `${date.getDate()}`;


    return year + '-' + month + '-' + day;
  }

  onSubmit() {
    console.log(this.userForm.valid);
    this.http.post<Client>(environment.baseUrl + 'api/clients', {
      phoneNumber: this.userForm.value.personalPhone,
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      middleName: this.userForm.value.middleName,
      dateOfRegistration: this.getCurrentDate(),
      email: this.userForm.value.primaryEmail,
      creditCardNum: this.userForm.value.creditCard,
    }).subscribe(result => {
      console.log('Client added !');
    });

    this.http.post<UserToRegister>(environment.baseUrl + 'auth/register', {
      username: this.userForm.value.personalPhone,
      password: this.userForm.value.password,
      role: 'Client'
    }).subscribe(() => {
      console.log('User added !');
    });
  }

}
