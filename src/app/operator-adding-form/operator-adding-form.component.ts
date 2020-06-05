import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-operator-adding-form',
  templateUrl: './operator-adding-form.component.html',
  styleUrls: ['./operator-adding-form.component.css']
})
export class OperatorAddingFormComponent  implements OnInit{
  operatorForm : FormGroup;
constructor(
  private formBuilder: FormBuilder,

){}

ngOnInit(){
  this.operatorForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    middleName: ['', Validators.required],
    lastName: ['', Validators.required],
    birthDate: ['', Validators.required],
    personalPhone: ['', Validators.required],
    workingPhone: ['', Validators.required],
    region: ['', Validators.required],
    city: ['', Validators.required],
    building: ['', Validators.required],
    street: ['', Validators.required],
    flat: [''],
    shiftTime: ['', Validators.required],
  });
  
}
onSubmit(){
  console.log(this.operatorForm.value);
}
}
