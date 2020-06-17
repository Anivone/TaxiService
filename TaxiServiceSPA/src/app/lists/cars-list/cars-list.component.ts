import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Car } from 'src/interfaces/models/car';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddPageComponent } from 'src/app/add-page/add-page.component';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css'],
})
export class CarsListComponent implements OnInit {
  constructor(
    public http: HttpClient,
    private dialog: MatDialog
  ) { }

  cars: MatTableDataSource<Car>;
  item = 'Автомобіль';

  displayedColumns = ['carId', 'typeOfCar', 'numberOfSeats', 'childSeat', 'Actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.getCars();
  }

  getCars() {
    this.http
      .get<Car[]>(environment.baseUrl + 'api/cars')
      .subscribe((result) => {
        this.cars = new MatTableDataSource<Car>(result);
        this.cars.paginator = this.paginator;
        this.cars.sort = this.sort;
        console.log(this.cars);
      });
  }

  edit(car: Car) {
    const dialogRef = this.dialog.open(AddPageComponent, {
      autoFocus: true,
      data: {
        item: this.item,
        car,
        edit: true
      }
    });
    dialogRef.afterClosed().subscribe(() => this.getCars());
  }

  delete(car: Car) {
    this.http.delete(environment.baseUrl + `api/cars/${car.carId}`)
      .subscribe(() => {
        this.getCars();
        console.log('car deleted');
      });
  }
}
