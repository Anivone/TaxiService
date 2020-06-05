import { Component, OnInit } from '@angular/core';
import { Order } from 'src/interfaces/models/order';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DriverListDialogComponent } from './driver-list-dialog/driver-list-dialog.component';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-operator-side-bar',
  templateUrl: './operator-side-bar.component.html',
  styleUrls: ['./operator-side-bar.component.css'],
})
export class OperatorSideBarComponent implements OnInit {
  newOrders: Order[];
  operatorId: number;

  public isLoading = false;

  constructor(
    public http: HttpClient,
    public dialog: MatDialog,
    private profile: ProfileService
    ) {
      profile.getOperator().subscribe(res => {
        this.operatorId = res.operatorId;
        console.log('operatorId: ', this.operatorId);
      });
    }

  ngOnInit() {
    this.getNewOrders();
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

  getNewOrders() {
    this.isLoading = true;
    this.http
      .get<Order[]>(environment.baseUrl + 'api/orders/new')
      .subscribe((result) => {
        this.newOrders = result;
        this.isLoading = false;
        console.log(this.newOrders);
      });
  }

  openDialog(order: Order) {
    const dialogRef = this.dialog.open(DriverListDialogComponent, {
      autoFocus: false,
      data: {
        orderId: order.orderId,
        operatorId: this.operatorId
      }
    });
    const sub = dialogRef.componentInstance.updateNewOrders.subscribe(() => {
      this.getNewOrders();
      console.log('event');
    });
  }
}
