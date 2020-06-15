import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AvailableDrivers } from 'src/interfaces/queryObjects/availableDrivers';

@Component({
  selector: 'app-driver-list-dialog',
  templateUrl: './driver-list-dialog.component.html',
  styleUrls: ['./driver-list-dialog.component.css'],
})
export class DriverListDialogComponent implements OnInit {

  availableDrivers: AvailableDrivers[];

  @Output() public updateNewOrders = new EventEmitter();

  constructor(
    public http: HttpClient,
    public dialogRef: MatDialogRef<DriverListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.getAvailableDrivers();
  }

  close() {
    this.dialogRef.close();
  }

  getAvailableDrivers() {
    this.http
      .get<AvailableDrivers[]>(environment.baseUrl + 'api/drivers/available')
      .subscribe((result) => {
        this.availableDrivers = result;
        console.log(this.availableDrivers);
      });
  }

  updateOrderInformation(driver: AvailableDrivers) {
    this.http.put(environment.baseUrl + `api/orders/sendToDriver/${this.data.orderId}`,
    {
      operatorId: this.data.operatorId,
      driverId: driver.driverId
    }).subscribe(result => {
      this.setDriverAvailability(false, driver);
      this.updateNewOrders.emit(true);
      this.close();
    });
  }

  setDriverAvailability(available: boolean, driver: AvailableDrivers) {
    this.http.put(environment.baseUrl + `api/drivers/available/${driver.driverId}`, { available })
      .subscribe(() => console.log('Availability status has been updated !'));
  }

  getTime(dt: string) {
    if (dt) {
      return dt.substr(11);
    }
    return dt;
  }
}
