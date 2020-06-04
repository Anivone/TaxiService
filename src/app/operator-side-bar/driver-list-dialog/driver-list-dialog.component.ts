import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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

  constructor(
    public http: HttpClient,
    public dialogRef: MatDialogRef<DriverListDialogComponent>
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
}
