import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Department } from 'src/interfaces/models/department';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-department-adding-form',
  templateUrl: './department-adding-form.component.html',
  styleUrls: ['./department-adding-form.component.css']
})
export class DepartmentAddingFormComponent implements OnInit {
  departmentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient) { }

  ngOnInit(): void {

    this.departmentForm = this.formBuilder.group({
      city: ['', Validators.required]
    })
  }
  onSubmit(){

    this.http.post<Department>(environment.baseUrl + 'api/departaments/new',{
      city: this.departmentForm.value.city,
    })
  }

}
