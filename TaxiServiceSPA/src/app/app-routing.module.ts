import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ClientsListComponent } from './lists/clients-list/clients-list.component';
import { OperatorPageComponent } from './operator-page/operator-page.component';
import { OperatorsListComponent } from './lists/operators-list/operators-list.component';
import { DriversListComponent } from './lists/drivers-list/drivers-list.component';
import { OrdersListComponent } from './lists/orders-list/orders-list.component';
import { CarsListComponent } from './lists/cars-list/cars-list.component';
import { DepartmentsListComponent } from './lists/departments-list/departments-list.component';
import { DriverPhonesListComponent } from './lists/driver-phones-list/driver-phones-list.component';
import { OperatorPhonesListComponent } from './lists/operator-phones-list/operator-phones-list.component';
import { AddPageComponent } from './add-page/add-page.component';
import { DriverPageComponent } from './driver-page/driver-page.component';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './operator-page/report/report.component';
import { UsersListComponent } from './lists/users-list/users-list.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'clients-list', component: ClientsListComponent, pathMatch: 'full' },
  { path: 'operators-list', component: OperatorsListComponent, pathMatch: 'full' },
  { path: 'drivers-list', component: DriversListComponent, pathMatch: 'full' },
  { path: 'orders-list', component: OrdersListComponent, pathMatch: 'full' },
  { path: 'cars-list', component: CarsListComponent, pathMatch: 'full' },
  { path: 'departments-list', component: DepartmentsListComponent, pathMatch: 'full' },
  { path: 'operator-phones-list', component: OperatorPhonesListComponent, pathMatch: 'full' },
  { path: 'driver-phones-list', component: DriverPhonesListComponent, pathMatch: 'full' },
  { path: 'user-list', component: UsersListComponent, pathMatch: 'full' },
  { path: 'add', component: AddPageComponent },
  { path: 'report', component: ReportComponent },
  { path: 'driver', component: DriverPageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
