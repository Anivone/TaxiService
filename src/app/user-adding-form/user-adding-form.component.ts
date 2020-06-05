import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-user-adding-form',
  templateUrl: './user-adding-form.component.html',
  styleUrls: ['./user-adding-form.component.css']
})
export class UserAddingFormComponent implements OnInit {
  get primEmail() {
    return this.userForm.get('primaryEmail')
  }
  userForm: FormGroup;
  constructor(
    private forrmBuilder: FormBuilder,
  ) { }
  // emailFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.email,
  // ]);

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.userForm = this.forrmBuilder.group({

      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      personalPhone: ['', Validators.required],
      creditCard: ['', Validators.required],
      primaryEmail: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      // emailFormControl: ['', Validators.required, Validators.email],


    });





  }
  onSubmit() {
    console.log(this.userForm.value);
  }

}