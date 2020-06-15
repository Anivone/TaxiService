import { Component, OnInit } from '@angular/core';
import { Car } from 'src/interfaces/models/car';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-add-page',
  templateUrl: './car-add-page.component.html',
  styleUrls: ['./car-add-page.component.css']
})
export class CarAddPageComponent implements OnInit {

  carForm: FormGroup;
  carTypes: string[] = ['Економ', 'Седан', 'Седан-бізнес', 'Мінівен'];
  childSeatTypes: string[] = ['Є', 'Немає'];
  carType: string;
  type: string;
  VINcode: string;
  numberOfSeats: number;
  childSeat: boolean;

  constructor(
    private formBuilder: FormBuilder,
    public http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.carForm = this.formBuilder.group({
      vinCode: ['', Validators.required],
      numOfSeats: ['', Validators.required],
      childSeat: ['', Validators.required]
    });
  }
  setTypeOfCar(type: string) {
    console.log('Car-type: ', type);
    this.type = type;

  }

  setNumOfSeats(num: string) {
    this.numberOfSeats = parseInt(num, 10);
    console.log(this.numberOfSeats);

  }

  setChildSeat(seat: string) {
    console.log('Child seat: ', seat);
    this.childSeat = seat === 'true' ? true : false;
  }

  setVINcode(code: string) {
    this.VINcode = code;
    console.log(this.VINcode);

  }

  onSubmit() {
    this.http.post<Car>(environment.baseUrl + 'api/cars', {
      carId: this.VINcode,
      typeOfCar: this.type,
      numberOfSeats: this.numberOfSeats,
      childSeat: this.childSeat
    }).subscribe(result => {
      console.log(result);
    }, err => console.log(err));
  }

}
