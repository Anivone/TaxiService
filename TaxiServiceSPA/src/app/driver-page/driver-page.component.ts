import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from 'src/interfaces/models/client';
import { Order } from 'src/interfaces/models/order';
import { ReceivedOrders } from 'src/interfaces/queryObjects/receivedOrders';
import { environment } from 'src/environments/environment';
import { ProfileService } from '../services/profile.service';
import { Driver } from 'src/interfaces/models/driver';

@Component({
  selector: 'app-driver-page',
  templateUrl: './driver-page.component.html',
  styleUrls: ['./driver-page.component.css']
})
export class DriverPageComponent implements OnInit {

  order: ReceivedOrders;
  driver: Driver;

  finalPrice: number;

  isLoading = false;

  constructor(
    private http: HttpClient,
    private profile: ProfileService
  ) {
    this.profile.getDriver().subscribe(res => {
      this.driver = res;
      this.getOrders();
    });
  }

  ngOnInit() {
  }

  getOrders() {
    this.isLoading = true;
    const driverId = this.driver.driverId;
    this.http.get<ReceivedOrders>(environment.baseUrl + `api/orders/driver/received/${driverId}`)
      .subscribe(res => {
        this.isLoading = false;
        this.order = res;
        console.log(this.order);
      });
  }



  getTime(dt: string) {
    if (dt) {
      return dt.substr(11);
    }
    return dt;
  }
}
