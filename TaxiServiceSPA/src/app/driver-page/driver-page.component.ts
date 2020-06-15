import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from 'src/interfaces/models/client';
import { Order } from 'src/interfaces/models/order';
import { ReceivedOrder } from 'src/interfaces/queryObjects/receivedOrders';
import { environment } from 'src/environments/environment';
import { ProfileService } from '../services/profile.service';
import { Driver } from 'src/interfaces/models/driver';
import { min } from 'rxjs/operators';

@Component({
  selector: 'app-driver-page',
  templateUrl: './driver-page.component.html',
  styleUrls: ['./driver-page.component.css']
})
export class DriverPageComponent implements OnInit {

  order: ReceivedOrder;
  driver: Driver;

  isAccepted = false;
  isCompleted = false;

  finalPrice: number;

  isLoading = false;

  empty = false;

  constructor(
    private http: HttpClient,
    private profile: ProfileService
  ) {
    this.profile.getDriver().subscribe(res => {
      this.driver = res;
      this.initOrder();
    });
  }

  ngOnInit() {
  }

  initOrder() {
    this.isLoading = true;
    const driverId = this.driver.driverId;
    this.http.get<ReceivedOrder>(environment.baseUrl + `api/orders/driver/completed/${driverId}`)
      .subscribe(res => {
        if (!res) {
          this.getAcceptedOrder();
          this.isCompleted = false;
        } else {
          this.order = res;
          this.isLoading = false;
          this.isCompleted = true;
          this.setFinalPrice();
        }
      });
  }

  getAcceptedOrder() {
    const driverId = this.driver.driverId;
    this.http.get<ReceivedOrder>(environment.baseUrl + `api/orders/driver/accepted/${driverId}`)
      .subscribe(res => {
        console.log(res);
        if (!res) {
          this.getReceivedOrder();
          this.isAccepted = false;
        } else {
          this.order = res;
          this.isLoading = false;
          this.isAccepted = true;
        }
      });
  }

  getReceivedOrder() {
    const driverId = this.driver.driverId;
    this.http.get<ReceivedOrder>(environment.baseUrl + `api/orders/driver/received/${driverId}`)
      .subscribe(res => {
        if (res) {
          this.order = res;
          this.isLoading = false;
          this.empty = false;
          console.log(this.order);
        } else {
          this.empty = true;
          this.isLoading = false;
        }
      });
  }

  acceptOrder() {
    console.log(this.getCurrentTime());
    console.log(this.order.orderId);
    this.http.put(environment.baseUrl + `api/orders/driver/acceptance/${this.order.orderId}`,
      { timeOfAcceptance: this.getCurrentTime() }).subscribe(() => {
        this.isAccepted = true;
        this.initOrder();
        console.log('Time of Acceptance is sent !');
      });
  }

  setDriverAvailability(available: boolean) {
    this.http.put(environment.baseUrl + `api/drivers/available/${this.driver.driverId}`, { available })
      .subscribe(() => console.log('Availability status has been updated !'));
  }

  completeOrder() {
    console.log(this.getCurrentTime());
    this.http.put(environment.baseUrl + `api/orders/driver/completion/${this.order.orderId}`,
      { timeOfCompletion: this.getCurrentTime() }).subscribe(res => {
        this.isAccepted = true;
        this.initOrder();
        console.log('Time of Completion is sent !');
      });
  }

  makeOrderPaid() {
    this.http.put(environment.baseUrl + `api/orders/driver/paid/${this.order.orderId}`,
      { finalPrice: this.finalPrice })
      .subscribe(() => {
        this.http.put(environment.baseUrl + `api/drivers/salary/${this.driver.driverId}`,
          { finalPrice: this.driver.salary + this.finalPrice * 0.6 })
          .subscribe(() => {
            console.log('Salary has been updated !');
          });
        console.log('Final Price is set !');
        this.setDriverAvailability(true);
        this.initOrder();
      });
  }

  setFinalPrice() {
    const acceptance = new Date(this.order.timeOfAcceptance).getTime();
    const completion = new Date(this.order.timeOfCompletion).getTime();
    const minutesDiff = Math.floor(completion / 60000) - Math.floor(acceptance / 60000);
    console.log('minutes difference: ', minutesDiff);
    const finalPrice = this.order.approximatePrice + minutesDiff * 1.2;
    this.finalPrice = finalPrice;
  }

  getCurrentTime() {
    const date = new Date();

    const year = date.getFullYear().toString();
    const month = date.getMonth().toString().length === 1 ? `0${date.getMonth()}` : `${date.getMonth()}`;
    const day = date.getDate().toString().length === 1 ? `0${date.getDate()}` : `${date.getDate()}`;
    const hours = date.getHours().toString().length === 1 ? `0${date.getHours()}` : `${date.getHours()}`;
    const minutes = date.getMinutes().toString().length === 1 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
    const seconds = date.getSeconds().toString().length === 1 ? `0${date.getSeconds()}` : `${date.getSeconds()}`;

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  getTime(dt: string) {
    if (dt) {
      return dt.substr(11);
    }
    return dt;
  }
}
