import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/models/user';
import { UserToRegister } from 'src/interfaces/models/userToRegister';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-add-page',
  templateUrl: './user-add-page.component.html',
  styleUrls: ['./user-add-page.component.css']
})
export class UserAddPageComponent implements OnInit {

  hide = true;
  userRole: string;
  roles: string[] = ['Клієнт', 'Оператор', 'Водій'];
  roleValues: string[] = ['Client', 'Operator', 'Driver'];
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient) {
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      phoneNumber: [null, [Validators.required, Validators.pattern('^[0-9]{10,10}$')]],
      password: [null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*)[A-Za-z].{8,}')]],
      role: ['', Validators.required]
    });
  }

  createUser() {
    this.http.post<UserToRegister>(environment.baseUrl + 'auth/register', {
      username: this.userForm.value.phoneNumber,
      password: this.userForm.value.password,
      role: this.userForm.value.role
    }).subscribe(result => console.log(result));
  }
}
