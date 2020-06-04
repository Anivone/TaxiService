import { Component, OnInit } from '@angular/core';
import { Order } from 'src/interfaces/models/order';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DriverListDialogComponent } from './driver-list-dialog/driver-list-dialog.component';

@Component({
  selector: 'app-operator-side-bar',
  templateUrl: './operator-side-bar.component.html',
  styleUrls: ['./operator-side-bar.component.css'],
})
export class OperatorSideBarComponent implements OnInit {
  newOrders: Order[];

  public dialogRef: MatDialogRef<DriverListDialogComponent>;

  constructor(
    public http: HttpClient,
    public dialog: MatDialog
    ) {}

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
    this.http
      .get<Order[]>(environment.baseUrl + 'api/orders/new')
      .subscribe((result) => {
        this.newOrders = result;
        console.log(this.newOrders);
      });
  }

  openDialog() {
    this.dialogRef = this.dialog.open(DriverListDialogComponent, {
      autoFocus: false
    });
  }
}
