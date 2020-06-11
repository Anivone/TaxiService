import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NewOrderDto } from 'src/interfaces/dto/newOrderDto';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-car-form',
  templateUrl: './add-car-form.component.html',
  styleUrls: ['./add-car-form.component.css']
})
export class AddCarFormComponent implements OnInit {
  carForm: FormGroup;
  carTypes: string[]= ['Економ', 'Седан', 'Седан-бізнес', 'Мінівен'];
  carType: string;
  type: string;
  VINcode: string;
  numberOfSeats: number;

  constructor(private formBuilder: FormBuilder,
    public http: HttpClient
) { }

  ngOnInit(): void {
    this.carForm = this.formBuilder.group({
      vinCode: ['',Validators.required],
      numOfSeats: ['', Validators.required]
    })
  }
  setTypeOfCar(type: string) {
    console.log("Car-type: ", type);
    this.type = type;
    console.log(this.type);

  }

  setNumOfSeats(num: number){
    this.numberOfSeats = num;
    console.log(this.numberOfSeats);

  }

  setVINcode(code: string){
    this.VINcode = code;
    console.log(this.VINcode);

  }

  onSubmit(){
    this.http.post<NewOrderDto>(environment.baseUrl + 'api/cars/new', {
      VINcode: this.VINcode,
      typeOfCar: this.type,
      numberOfSeats: this.numberOfSeats,
    }).subscribe(result => {
      console.log(result);
    
    
    
    }, err => console.log(err));

}
}
