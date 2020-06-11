import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-driver-app-page',
  templateUrl: './driver-app-page.component.html',
  styleUrls: ['./driver-app-page.component.css']
})
export class DriverAppPageComponent implements OnInit {
  driverForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

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
}
