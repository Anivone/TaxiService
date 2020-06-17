import { Component, OnInit, Input } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroupDirective, FormControl, NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Client } from 'src/interfaces/models/client';


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

  @Input() public editClient: Client;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({

      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      personalPhone: ['', Validators.pattern('^[0-9]{10,10}$')],
      creditCard: ['', Validators.required],
      primaryEmail: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])
    });

    if (this.editClient) {
      this.userForm.controls.firstName.setValue(this.editClient.firstName);
      this.userForm.controls.middleName.setValue(this.editClient.middleName);
      this.userForm.controls.lastName.setValue(this.editClient.lastName);
      this.userForm.controls.personalPhone.setValue(this.editClient.phoneNumber);
      this.userForm.controls.creditCard.setValue(this.editClient.creditCardNum);
      this.userForm.controls.primaryEmail.setValue(this.editClient.email);
    }
  }

  createClient() {
    this.http.post<Client>(environment.baseUrl + 'api/clients', {
      phoneNumber: this.userForm.value.personalPhone,
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      middleName: this.userForm.value.middleName,
      dateOfRegistration: this.getCurrentDate(),
      email: this.userForm.value.primaryEmail,
      creditCardNum: this.userForm.value.creditCard
    }).subscribe(result => console.log(result));
  }

  updateClient() {
    this.http.put<Client>(environment.baseUrl + `api/clients/${this.editClient.clientId}`, {
      clientId: this.editClient.clientId,
      phoneNumber: this.userForm.value.personalPhone,
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      middleName: this.userForm.value.middleName,
      email: this.userForm.value.primaryEmail,
      creditCardNum: this.userForm.value.creditCard
    }).subscribe(result => console.log(result));
  }

  getCurrentDate(): string {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().length === 1 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    const day = date.getDate().toString().length === 1 ? `0${date.getDate()}` : `${date.getDate()}`;


    return year + '-' + month + '-' + day;
  }
}
