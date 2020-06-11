import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroupDirective, FormControl, NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-client-add-page',
  templateUrl: './client-add-page.component.html',
  styleUrls: ['./client-add-page.component.css']
})
export class ClientAddPageComponent implements OnInit {
  get primEmail() {
    return this.userForm.get('primaryEmail');
  }
  public userForm: FormGroup;

  public matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({

      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      personalPhone: ['', Validators.required],
      creditCard: ['', Validators.required],
      primaryEmail: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])

    });

  }
}
