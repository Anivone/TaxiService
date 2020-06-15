import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NewOrderDto } from 'src/interfaces/dto/newOrderDto';

@Component({
  selector: 'app-order-add-page',
  templateUrl: './order-add-page.component.html',
  styleUrls: ['./order-add-page.component.css']
})
export class OrderAddPageComponent implements OnInit {
  orderForm: FormGroup;
  finish = false;
  wayOfPayment: string;
  ways: string[] = ['Готівка', 'Картка'];
  departurePoint: string;
  arrivalPoint: string;
  typeOfCar: string;
  numberOfKm: number;
  appointedTime: string;
  paymentMethod: string;
  approximatePrice: number;
  constructor(
    private formBuilder: FormBuilder,
    public http: HttpClient
  ) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      departure: ['', Validators.required],
      arrival: ['', Validators.required],
      numberOfKm: [{ value: '', disabled: true }, '', Validators.required],
      approximatePrice: [{ value: '', disabled: true }, '', Validators.required],
      appointedTime: ['', Validators.required],
      carType: ['', Validators.required]

    });

  }
  toggleFinish(): void {
    this.finish = !this.finish;
    this.wayOfPayment = null;
  }

  setDeparture(value: any) {
    this.departurePoint = value.formatted_address;
    console.log(this.departurePoint);
    if (this.departurePoint && this.arrivalPoint) {
      this.getDistance(
        this.departurePoint,
        this.arrivalPoint
      );
    }
  }

  setArrival(value: any) {
    this.arrivalPoint = value.formatted_address;
    console.log(this.arrivalPoint);
    if (this.departurePoint && this.arrivalPoint) {
      this.getDistance(
        this.departurePoint,
        this.arrivalPoint
      );
    }
  }

  setTypeOfCar(type: string) {
    this.typeOfCar = type;
  }

  setAppointedTime(time: string) {
    this.appointedTime = time;
  }

  setPaymentMethod(way: string) {
    console.log('test type: ', way);
    this.paymentMethod = way;
  }

  getDistance(id1: string, id2: string) {
    return new google.maps.DistanceMatrixService().getDistanceMatrix(
      {
        origins: [id1],
        destinations: [id2],
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result) => {
        this.numberOfKm = result.rows[0].elements[0].distance.value / 1000;
        this.approximatePrice = 40 + this.numberOfKm * 4.5;
        console.log('Number of km: ', this.numberOfKm);
      }
    );
  }

  printValue(value: any) {
    console.log(value);
  }

  getCurrentDate(): string {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().length === 1 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    const day = date.getDate().toString().length === 1 ? `0${date.getDate()}` : `${date.getDate()}`;


    return year + '-' + month + '-' + day;
  }

  createNewOrder() {
    this.toggleFinish();
    console.log('payment: ', this.paymentMethod);
    this.http.post<NewOrderDto>(environment.baseUrl + 'api/orders/new', {
      wayOfOrder: 'Телефон',
      clientId: 2,
      departurePoint: this.departurePoint,
      arrivalPoint: this.arrivalPoint,
      numberOfKm: this.numberOfKm,
      orderDate: this.getCurrentDate(),
      appointedTime: this.appointedTime,
      typeOfCar: this.typeOfCar,
      typeOfPayment: this.paymentMethod,
      approximatePrice: this.approximatePrice

    }).subscribe(result => {
      console.log(result);

    }, err => console.log(err));


  }
}
