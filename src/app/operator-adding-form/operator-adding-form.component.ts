import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-operator-adding-form',
  templateUrl: './operator-adding-form.component.html',
  styleUrls: ['./operator-adding-form.component.css']
})
export class OperatorAddingFormComponent  implements OnInit{
  operatorForm : FormGroup;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  phones: string[] = [];
constructor(
  private formBuilder: FormBuilder,
  public http : HttpClient,

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
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our phone
    if ((value || '').trim()) {
      this.phones.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  remove(phone: string): void {
    const index = this.phones.indexOf(phone);

    if (index >= 0) {
      this.phones.splice(index, 1);
    }
  }
onSubmit(){
  
}
}
