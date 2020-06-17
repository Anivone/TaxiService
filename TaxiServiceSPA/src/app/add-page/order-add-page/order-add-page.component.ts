import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NewOrderDto } from 'src/interfaces/dto/newOrderDto';
import { Client } from 'src/interfaces/models/client';

@Component({
  selector: 'app-order-add-page',
  templateUrl: './order-add-page.component.html',
  styleUrls: ['./order-add-page.component.css']
})
export class OrderAddPageComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;

  finish = false;
  wayOfPayment: string;
  ways: string[] = ['Готівкою', 'Кредитною карт'];
  departurePoint: string;
  arrivalPoint: string;
  typeOfCar: string;
  numberOfKm: number;
  appointedTime: string;
  paymentMethod: string;
  approximatePrice: number;

  childSeatTypes: string[] = ['Потрібно', 'Не потрібно'];

  clientsSelect: Client[];
  constructor(
    private formBuilder: FormBuilder,
    public http: HttpClient
  ) { }

  ngOnInit() {
    this.getClients();
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required],
    });

    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required],
      thirdCtrl: ['', Validators.required],
    });

    this.thirdFormGroup = this.formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });
    this.fourthFormGroup = this.formBuilder.group({
      fourthCtrl: ['', Validators.required],
      fifthCtrl: ['', Validators.required]
    });
    this.fifthFormGroup = this.formBuilder.group({
      fifthCtrl: ['', Validators.required]
    });
  }

  getClients() {
    this.http.get<Client[]>(environment.baseUrl + 'api/clients')
    .subscribe(res => {
      this.clientsSelect = res;
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
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
    console.log(this.thirdFormGroup.value);
    console.log(this.fourthFormGroup.value);
    this.http.post<NewOrderDto>(environment.baseUrl + 'api/orders/new', {
      wayOfOrder: 'Website',
      clientId: parseInt(this.fourthFormGroup.value.fifthCtrl, 10),
      departurePoint: this.departurePoint,
      arrivalPoint: this.arrivalPoint,
      numberOfKm: this.numberOfKm,
      orderDate: this.getCurrentDate(),
      appointedTime: `1900-01-01T${this.appointedTime}:00`,
      childSeat: this.fourthFormGroup.value.fourthCtrl === 'Потрібно' ? true : false,
      typeOfCar: this.typeOfCar,
      typeOfPayment: this.fifthFormGroup.value.fifthCtrl,
      approximatePrice: this.approximatePrice
    }).subscribe(result => {
      console.log(result);
    }, err => console.log(err));


  }
}
