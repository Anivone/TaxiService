import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/interfaces/models/order';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

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
    'Child Seat',
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
        this.orders.paginator = this.paginator;
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
