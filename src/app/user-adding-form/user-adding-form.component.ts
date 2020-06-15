import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder, FormControlName } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NewOrderDto } from 'src/interfaces/dto/newOrderDto';
import { environment } from 'src/environments/environment';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted) && (invalidCtrl || invalidParent));
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
    private http: HttpClient
  ) { }
 
  matcher = new MyErrorStateMatcher();

  // isSubmitted(value: any) {
  //   console.log(" is valid: ", value)
  // }

  ngOnInit() {
    this.userForm = this.forrmBuilder.group({

      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      personalPhone: (['', Validators.pattern(/^[0-9]{10,10}$/)]),
      creditCard: [''],
      primaryEmail: new FormControl('', [
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      // emailFormControl: ['', Validators.required, Validators.email],


    });





  }
  onSubmit() {
    console.log(this.userForm.valid);
    this.http.post<NewOrderDto>(environment.baseUrl + 'api/users/new', {
      firstName: this.userForm.value.firstName,
      middleName: this.userForm.value.middleName,
      lastName: this.userForm.value.lastName,
      personalPhone: this.userForm.value.personalPhone,
      creditCard: this.userForm.value.creditCard,
      Email: this.userForm.value.primaryEmail,
    }).subscribe(result => {
      console.log("");
    }), err => console.log(err);

  }

}