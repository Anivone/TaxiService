import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Department } from 'src/interfaces/models/department';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-department-add-page',
  templateUrl: './department-add-page.component.html',
  styleUrls: ['./department-add-page.component.css']
})
export class DepartmentAddPageComponent implements OnInit {
  departmentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient) { }

  ngOnInit(): void {

    this.departmentForm = this.formBuilder.group({
      city: ['', Validators.required]
    });
  }
  onSubmit(){

    this.http.post<Department>(environment.baseUrl + 'api/departments',{
      city: this.departmentForm.value.city,
    }).subscribe(() => console.log('Department has been added! '));
  }

}
