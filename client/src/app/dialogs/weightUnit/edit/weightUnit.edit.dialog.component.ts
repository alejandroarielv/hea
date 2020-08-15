import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { WeightUnitsService } from '../../../services/weightUnits-service.service';
import { IWeightUnit } from '../../../models/weightUnit';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-weightUnit-edit-dialog',
  templateUrl: 'weightUnit.edit.dialog.html',
  styleUrls: ['weightUnit.edit.dialog.css']
})

export class WeightUnitEditDialogComponent {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<WeightUnitEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private weightUnitService: WeightUnitsService,
    private formBuilder: FormBuilder,
  ) {
    dialogRef.disableClose = true;
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      description: [this.data.weightUnit.description, [Validators.required, Validators.minLength(5)]],
      shortDescription: [this.data.weightUnit.shortDescription, [Validators.required, Validators.minLength(5)]],
      enabled: [this.data.weightUnit.enabled, []]
    });
  }

  onSubmit({ value, valid }: { value: IWeightUnit, valid: boolean }) {

    if (valid) {
      this.weightUnitService.updateWeightUnit(this.data.weightUnit.id, value).subscribe(
        res => {
          this.dialogRef.close({ data: 'SAVE_BUTTON_CLICKED' });
        },
        err => {
          console.log("Error saving WEIGHT UNIT", value);
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
