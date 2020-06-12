import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Car } from 'src/interfaces/models/car';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddPageComponent } from 'src/app/add-page/add-page.component';

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

  edit(car: Car) {
    const dialogRef = this.dialog.open(AddPageComponent, {
      autoFocus: true,
      data: {
        item: this.item,
        car,
        edit: true
      }
    });
  }

  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
  }
}
