import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Car } from 'src/interfaces/models/car';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css'],
})
export class CarsListComponent implements OnInit {
  constructor(public http: HttpClient) {}

  cars: MatTableDataSource<Car>;
  item = 'Автомобіль';

  displayedColumns = ['Car Id', 'Type of Car', 'Number of Seats', 'Actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.getCars();
  }

  getCars() {
    this.http
      .get<Car[]>(environment.baseUrl + 'api/cars')
      .subscribe((result) => {
        this.cars = new MatTableDataSource<Car>(result);
        this.cars.paginator = this.paginator;
        console.log(this.cars);
      });
  }

  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
  }
}
