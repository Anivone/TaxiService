import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder, FormControlName, Validator } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Client } from 'src/interfaces/models/client';
import { environment } from 'src/environments/environment';
import { PasswordValidation } from './password-validator';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted) );
  }
}

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {

  get primEmail() {
    return this.userForm.get('primaryEmail')
  }
  userForm: FormGroup;
  equal = true;
  hide = true;
  hide1= true;
  
  constructor(
    private forrmBuilder: FormBuilder,
    private http: HttpClient
  ) { }
  // ]);

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.userForm = this.forrmBuilder.group({

      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      personalPhone: (['', Validators.pattern("^[0-9]{10,10}$")]),
      creditCard: [''],
      primaryEmail: new FormControl('', [
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      password: [null, [Validators.required, 
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*)[A-Za-z].{8,}')]],
      confirmPassword: [null, [Validators.required,]]
    });

  } 

  isEqual(): void{
  
    if(!(this.userForm.value.password === this.userForm.value.confirmPassword)){
      this.userForm.controls['confirmPassword'].setErrors({'unEqual': true})
  }
}

  getCurrentDate(): string {
    const today = new Date();
    const dd = String(today.getDay()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    return year + '-' + mm + '-' + dd;
  }

  onSubmit() {
    console.log(this.userForm.valid);
    this.http.post<Client>(environment.baseUrl + 'api/users/new', {
      phoneNumber: this.userForm.value.personalPhone,
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      middleName: this.userForm.value.middleName,
      dateOfRegistration: this.getCurrentDate(),
      email: this.userForm.value.primaryEmail,
      creditCardNum: this.userForm.value.creditCard,
      password: this.userForm.value.password,
    }).subscribe(result => {
      console.log("");
    }), err => console.log(err);

  }

}
