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

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'clients-list', component: ClientsListComponent },
      { path: 'operators-list', component: OperatorsListComponent },
      { path: 'drivers-list', component: DriversListComponent },
      { path: 'orders-list', component: OrdersListComponent },
      { path: 'cars-list', component: CarsListComponent },
      { path: 'departments-list', component: DepartmentsListComponent },
      { path: 'operator-phones-list', component: OperatorPhonesListComponent },
      { path: 'driver-phones-list', component: DriverPhonesListComponent },
      { path: 'add', component: AddPageComponent },
    ],
  },
  { path: 'driver', component: DriverPageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
