import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.carForm = this.formBuilder.group({
      vinCode: ['',Validators.required],
      numOfSeats: ['', Validators.required]
    })
  }
  setTypeOfCar(type: string) {
    console.log("Car-type: ", type);
    this.type = type;
  }
  onSubmit(){
    this.carType=null;
    console.log(this.carForm.value);
  }

}
