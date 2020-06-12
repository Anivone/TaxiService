import { Component, OnInit, Inject, Input, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';
import { Driver } from 'src/interfaces/models/driver';
import { Client } from 'src/interfaces/models/client';
import { Operator } from 'src/interfaces/models/operator';
import { Car } from 'src/interfaces/models/car';
import { Department } from 'src/interfaces/models/department';
import { DriverPhones } from 'src/interfaces/models/driver-phones';
import { OperatorPhones } from 'src/interfaces/models/operator-phones';
import { Order } from 'src/interfaces/models/order';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit {
  public dialogRef: MatDialogRef<AddPageComponent>;
  public item: any;

  @Input() public operator: Operator;
  @Input() public driver: Driver;
  @Input() public client: Client;
  @Input() public car: Car;
  @Input() public department: Department;
  @Input() public driverPhone: DriverPhones;
  @Input() public operatorPhone: OperatorPhones;
  @Input() public order: Order;

  @Input() public edit = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);

    this.item = this.data.item;
    this.edit = this.data.edit;

    this.operator = this.data.operator;
    this.driver = this.data.driver;
    this.client = this.data.client;
    this.car = this.data.car;
    this.department = this.data.department;
    this.driverPhone = this.data.driverPhone;
    this.operatorPhone = this.data.operatorPhone;
    this.order = this.data.order;
  }

  close() {
    this.dialogRef.close();
  }
}
