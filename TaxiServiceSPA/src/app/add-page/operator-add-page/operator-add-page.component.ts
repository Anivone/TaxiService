import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-operator-add-page',
  templateUrl: './operator-add-page.component.html',
  styleUrls: ['./operator-add-page.component.css']
})
export class OperatorAddPageComponent implements OnInit {

  public operatorForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.operatorForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      personalPhone: ['', Validators.required],
      workingPhone: ['', Validators.required],
      region: ['', Validators.required],
      city: ['', Validators.required],
      building: ['', Validators.required],
      street: ['', Validators.required],
      flat: [''],
      shiftTime: ['', Validators.required],
    });

  }
}
