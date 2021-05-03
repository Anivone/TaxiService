import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/interfaces/models/order';
import { environment } from 'src/environments/environment';
import { NewOrderDto } from 'src/interfaces/dto/newOrderDto';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { User } from 'src/models/user';
import { Observable } from 'rxjs';
import { Client } from 'src/interfaces/models/client';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-order-stepper',
  templateUrl: './order-stepper.component.html',
  styleUrls: ['./order-stepper.component.css'],
})
export class OrderStepperComponent implements OnInit {
  finish = false;

  radio: any;

  departurePoint: string;
  arrivalPoint: string;
  typeOfCar: string;
  numberOfKm: number;
  appointedTime: string;
  paymentMethod: string;
  approximatePrice: number;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFromGroup: FormGroup;

  wayOfPayment: string;
  ways: string[] = ['Готівкою', 'Кредитною картою'];
  childSeatTypes: string[] = ['Потрібно', 'Не потрібно'];
  childSeat: boolean;

  user: User;
  client: Client;

  fullTime: string;

  @ViewChild('stepper') stepper: any;

  constructor(
    public formBuilder: FormBuilder,
    public http: HttpClient,
    public auth: AuthService,
    public dialog: MatDialog,
    private profile: ProfileService
  ) {
    auth.currentUser.subscribe(user => {
      this.user = user;
      if (user.isLoggedIn && user.role === 'Client') {
        this.profile.getClient().subscribe(res => this.client = res);
      }
    });
  }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required],
    });

    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required],
    });

    this.thirdFormGroup = this.formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });
    this.fourthFormGroup = this.formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
    this.fifthFromGroup = this.formBuilder.group({
      childSeat: ['', Validators.required]
    });
  }

  toggleFinish(): void {
    this.finish = !this.finish;
    this.wayOfPayment = null;
  }

  setDeparture(value: any) {
    this.departurePoint = value.formatted_address;
    console.log(value);
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

  setChildSeat(seat: string) {
    console.log('Child seat: ', seat);
    this.childSeat = seat === 'Потрібно' ? true : false;
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
        this.approximatePrice = Math.ceil(40 + this.numberOfKm * 4.5);
        console.log('Approximate price: ', this.approximatePrice);
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
    console.log('current date: ', this.getCurrentDate());
    this.http.post<NewOrderDto>(environment.baseUrl + 'api/orders/new', {
      wayOfOrder: 'Website',
      clientId: this.client.clientId,
      departurePoint: this.departurePoint,
      arrivalPoint: this.arrivalPoint,
      numberOfKm: this.numberOfKm,
      orderDate: this.getCurrentDate(),
      appointedTime: `1900-01-01T${this.appointedTime}:00`,
      childSeat: this.childSeat,
      typeOfCar: this.typeOfCar,
      typeOfPayment: this.paymentMethod,
      approximatePrice: this.approximatePrice
    }).subscribe(result => {
      console.log(result);
    }, err => console.log(err));
  }

  loginToCreateOrder() {
    const dialogRef = this.dialog.open(LoginComponent, {
      autoFocus: false,
      data: 'Login'
    });
  }

  getCurrentTime() {
    const date = new Date();

    const hours = date.getHours().toString().length === 1 ? `0${date.getHours()}` : `${date.getHours()}`;
    const minutes = date.getMinutes().toString().length === 1 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
    const seconds = date.getSeconds().toString().length === 1 ? `0${date.getSeconds()}` : `${date.getSeconds()}`;

    return `${hours}:${minutes}:${seconds}`;
  }

}
