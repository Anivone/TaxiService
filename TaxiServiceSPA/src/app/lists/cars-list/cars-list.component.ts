import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Car } from 'src/interfaces/models/car';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css'],
})
export class CarsListComponent implements OnInit {
  constructor(public http: HttpClient) {}

  cars: MatTableDataSource<Car>;
  item = 'Car';

  displayedColumns = ['Car Id', 'Type of Car', 'Number of Seats', 'Actions'];

  ngOnInit() {
    this.getCars();
  }

  getCars() {
    this.http
      .get<Car[]>(environment.baseUrl + 'api/cars')
      .subscribe((result) => {
        this.cars = new MatTableDataSource<Car>(result);
        console.log(this.cars);
      });
  }

  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
  }
}
