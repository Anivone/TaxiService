import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-driver-adding-form',
  templateUrl: './driver-adding-form.component.html',
  styleUrls: ['./driver-adding-form.component.css']
})
export class DriverAddingFormComponent implements OnInit {
  driverForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit() {
    this.driverForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      personalPhone: ['', Validators.required],
      drivingLicense: ['', Validators.required],
      region: ['', Validators.required],
      city: ['', Validators.required],
      building: ['', Validators.required],
      street: ['', Validators.required],
      flat: [''],
      shiftTime: ['', Validators.required],

    });
   

  }
  onSubmit() {
    console.log(this.driverForm.value);
  }
}