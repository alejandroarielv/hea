import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { WeightUnitsService } from '../../../services/weightUnits-service.service';
import { IWeightUnit } from '../../../models/weightUnit';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-weightUnit-add-dialog',
  templateUrl: 'weightUnit.add.dialog.html',
  styleUrls: ['weightUnit.add.dialog.css']
})

export class WeightUnitAddDialogComponent {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<WeightUnitAddDialogComponent>,
    private weightUnitService: WeightUnitsService,
    private formBuilder: FormBuilder,
  ) {
    dialogRef.disableClose = true;
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(5)]],
      shortDescription: ['', [Validators.required, Validators.minLength(5)]],
      enabled: ['', []]
    });
  }

  onSubmit({ value, valid }: { value: IWeightUnit, valid: boolean }) {

    if (valid) {
      this.weightUnitService.saveWeightUnit(value).subscribe(
        res => {
          this.dialogRef.close({ data: 'ADD_BUTTON_CLICKED' });
        },
        err => {
          console.log("Error adding WEIGHT UNIT", value);
          this.dialogRef.close({ data: 'ERROR' });
        }
      );
    } else {
      console.log("NOT valid form");
      this.form.markAllAsTouched();
    }
  }

  closeClick() {
    this.dialogRef.close({ data: 'CANCEL_BUTTON_CLICKED' });
  }

  submit() {
    console.log("submited method");
  }
  
  //Getters form fields
  get descriptionField() {
    return this.form.get('description');
  }
  get shortDescriptionField() {
    return this.form.get('shortDescription');
  }
  get enabledField() {
    return this.form.get('enabled');
  }

}
