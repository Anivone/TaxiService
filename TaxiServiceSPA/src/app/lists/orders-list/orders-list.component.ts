import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/interfaces/models/order';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent implements OnInit {
  constructor(public http: HttpClient) {}

  orders: MatTableDataSource<Order>;

  displayedColumns = [
    'Id',
    'Way of Order',
    'Operator Id',
    'Driver Id',
    'Client Id',
    'Departure Point',
    'Arrival Point',
    'Number of Km',
    'Approximate Price',
    'Order Date',
    'Appointed Time',
    'Type of Car',
    'Time of Acceptance',
    'Time of Completion',
    'Type of Payment',
    'Final Price',
    'Actions',
  ];

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.http
      .get<Order[]>(environment.baseUrl + 'api/orders')
      .subscribe((result) => {
        this.orders = new MatTableDataSource<Order>(result);
        console.log(this.orders);
      });
  }

  getTime(dt: string) {
    if (dt) {
      return dt.substr(11);
    }
    return dt;
  }

  getDate(dt: string) {
    if (dt) {
      return dt.substr(0, 10);
    }
    return dt;
  }

  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
  }
}
