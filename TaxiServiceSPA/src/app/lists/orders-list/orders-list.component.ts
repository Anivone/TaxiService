import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/interfaces/models/order';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent implements OnInit {
  constructor(
    private http: HttpClient,
    ) { }


  orders: MatTableDataSource<Order>;
  item = 'Замовлення';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns = [
    'orderId',
    'wayOfOrder',
    'operatorId',
    'driverId',
    'clientId',
    'departurePoint',
    'arrivalPoint',
    'numberOfKm',
    'approximatePrice',
    'orderDate',
    'appointedTime',
    'childSeat',
    'typeOfCar',
    'timeOfAcceptance',
    'timeOfCompletion',
    'typeOfPayment',
    'finalPrice',
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
        this.orders.paginator = this.paginator;
        this.orders.sort = this.sort;
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

  deleteOrder(order: Order) {
    this.http.delete(environment.baseUrl + `api/orders/${order.orderId}`)
      .subscribe(() => {
        this.getOrders();
        console.log('deleted !');
      });
  }
}
