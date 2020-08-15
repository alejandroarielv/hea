import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { MeasurementUnitsService } from '../../../services/measurementUnits-service.service';
import { IMeasurementUnit } from '../../../models/measurementUnit';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-measurementUnit-edit-dialog',
  templateUrl: 'measurementUnit.edit.dialog.html',
  styleUrls: ['measurementUnit.edit.dialog.css']
})

export class MeasurementUnitEditDialogComponent {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MeasurementUnitEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private measurementUnitService: MeasurementUnitsService,
    private formBuilder: FormBuilder,
  ) {
    dialogRef.disableClose = true;
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      description: [this.data.measurementUnit.description, [Validators.required, Validators.minLength(5)]],
      shortDescription: [this.data.measurementUnit.shortDescription, [Validators.required, Validators.minLength(5)]],
      enabled: [this.data.measurementUnit.enabled, []]
    });
  }

  onSubmit({ value, valid }: { value: IMeasurementUnit, valid: boolean }) {

    if (valid) {
      this.measurementUnitService.updateMeasurementUnit(this.data.measurementUnit.id, value).subscribe(
        res => {
          this.dialogRef.close({ data: 'SAVE_BUTTON_CLICKED' });
        },
        err => {
          console.log("Error saving MEASUREMENT UNIT", value);
          this.dialogRef.close({ data: 'ERROR' });
        }
      );
    } else {
      console.log("NOT valid form");
      this.form.markAllAsTouched();
    }
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

  closeClick() {
    this.dialogRef.close({ data: 'CANCEL_BUTTON_CLICKED' });
  }

  submit() {
    console.log("submited method");
  }

}
