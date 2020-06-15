import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderStepperComponent } from './order-stepper/order-stepper.component';
import { ClientsListComponent } from './lists/clients-list/clients-list.component';

import { HttpClientModule } from '@angular/common/http';
import { OperatorsListComponent } from './lists/operators-list/operators-list.component';
import { OperatorPageComponent } from './operator-page/operator-page.component';
import { DriversListComponent } from './lists/drivers-list/drivers-list.component';
import { OrdersListComponent } from './lists/orders-list/orders-list.component';
import { CarsListComponent } from './lists/cars-list/cars-list.component';
import { DepartmentsListComponent } from './lists/departments-list/departments-list.component';
import { DriverPhonesListComponent } from './lists/driver-phones-list/driver-phones-list.component';
import { OperatorPhonesListComponent } from './lists/operator-phones-list/operator-phones-list.component';
import { AddPageComponent } from './add-page/add-page.component';
import { OperatorSideBarComponent } from './operator-side-bar/operator-side-bar.component';
import { DriverListDialogComponent } from './operator-side-bar/driver-list-dialog/driver-list-dialog.component';
import { DriverPageComponent } from './driver-page/driver-page.component';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { LoginComponent } from './login/login.component';
import { AddButtonComponent } from './lists/add-button/add-button.component';
import { ReportComponent } from './operator-page/report/report.component';
import { ProfileService } from './services/profile.service';
import { DriverAppPageComponent } from './add-page/driver-app-page/driver-app-page.component';
import { ClientAddPageComponent } from './add-page/client-add-page/client-add-page.component';
import { OperatorAddPageComponent } from './add-page/operator-add-page/operator-add-page.component';
import { OperatorActionBarComponent } from './operator-page/operator-action-bar/operator-action-bar.component';
import { OrderAddPageComponent } from './add-page/order-add-page/order-add-page.component';
import { UsersListComponent } from './lists/users-list/users-list.component';
import { CarAddPageComponent } from './add-page/car-add-page/car-add-page.component';
import { DriverPhonesAddPageComponent } from './add-page/driver-phones-add-page/driver-phones-add-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    OrderStepperComponent,
    ClientsListComponent,
    OperatorsListComponent,
    OperatorPageComponent,
    DriversListComponent,
    OrdersListComponent,
    CarsListComponent,
    DepartmentsListComponent,
    DriverPhonesListComponent,
    OperatorPhonesListComponent,
    AddPageComponent,
    OperatorSideBarComponent,
    DriverListDialogComponent,
    DriverPageComponent,
    LoginComponent,
    AddButtonComponent,
    ReportComponent,
    DriverAppPageComponent,
    ClientAddPageComponent,
    OperatorAddPageComponent,
    OperatorActionBarComponent,
    OrderAddPageComponent,
    UsersListComponent,
    CarAddPageComponent,
    DriverPhonesAddPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDKKnmD4wIWNHzDsvNeQkgpIEdCKa_7o_k',
      libraries: ['places'],
    }),
    MatGoogleMapsAutocompleteModule,
    NgxMaterialTimepickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent,
    DriverListDialogComponent,
    AddPageComponent,
  ],
})
export class AppModule { }
