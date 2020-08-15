import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { MeasurementUnitsService } from '../../../services/measurementUnits-service.service';
import { IMeasurementUnit } from '../../../models/measurementUnit';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-measurementUnit-add-dialog',
  templateUrl: 'measurementUnit.add.dialog.html',
  styleUrls: ['measurementUnit.add.dialog.css']
})

export class MeasurementUnitAddDialogComponent {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MeasurementUnitAddDialogComponent>,
    private measurementUnitService: MeasurementUnitsService,
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

  onSubmit({ value, valid }: { value: IMeasurementUnit, valid: boolean }) {

    if (valid) {
      this.measurementUnitService.saveMeasurementUnit(value).subscribe(
        res => {
          this.dialogRef.close({ data: 'ADD_BUTTON_CLICKED' });
        },
        err => {
          console.log("Error adding MEASUREMENT UNIT", value);
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
