import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NewOrderDto } from 'src/interfaces/dto/newOrderDto';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-driver-adding-form',
  templateUrl: './driver-adding-form.component.html',
  styleUrls: ['./driver-adding-form.component.css']
})
export class DriverAddingFormComponent implements OnInit {
  driverForm: FormGroup;

  // firstName: string
  // middleNmae: string
  valid = true;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true; 
  num: number;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  phones: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient

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
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;  

    if ((value || '').trim()) {
      this.phones.push(value);

    }

    if (input) {
      input.value = '';
    }
  }
 
  remove(phone: any): void {

    
    const index = this.phones.indexOf(phone);

    if (index >= 0) {
      this.phones.splice(index, 1);
    }
  }

  isValid(){
     var reg = /^\d+$/;

    for(let index in this.phones){
      if(reg.test(this.phones[index]) || this.phones.length == 0){
        this.valid = true;
      } else{
        this.valid = false;
      }
    }
    if(this.phones.length ==0){
      this.valid = true;
    }
  }
  onSubmit() {
    console.log(this.phones.length);
    // console.log(this.phones[0] === "string" );
    // console.log(this.phones);
    this.http.post<NewOrderDto>(environment.baseUrl + 'api/drivers/new', {
      firstName: this.driverForm.value.firstName,
      middleName: this.driverForm.value.middleName,
      lastName: this.driverForm.value.lastName,
      birthDate: this.driverForm.value.birthDate,
      personalPhones: this.phones,
      drivingLicense: this.driverForm.value.drivingLicense,
      region: this.driverForm.value.region,
      city: this.driverForm.value.city,
      street: this.driverForm.value.street,
      building: this.driverForm.value.building,
      flat: this.driverForm.value.flat,
      shiftTime: this.driverForm.value.shiftTime,


    }).subscribe(result => {
      console.log(result);

    }, err => console.log(err));

  }
}