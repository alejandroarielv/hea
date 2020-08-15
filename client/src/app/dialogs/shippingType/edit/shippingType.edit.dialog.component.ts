import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ShippingTypesService } from '../../../services/shippingTypes-service.service';
import { IShippingType } from '../../../models/shippingType';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-shippingType-edit-dialog',
  templateUrl: 'shippingType.edit.dialog.html',
  styleUrls: ['shippingType.edit.dialog.css']
})

export class ShippingTypeEditDialogComponent {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ShippingTypeEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private shippingTypeService: ShippingTypesService,
    private formBuilder: FormBuilder,
  ) {
    dialogRef.disableClose = true;
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      description: [this.data.shippingType.description, [Validators.required, Validators.minLength(5)]],
      shortDescription: [this.data.shippingType.shortDescription, [Validators.required, Validators.minLength(5)]],
      image: [this.data.shippingType.image, []],
      enabled: [this.data.shippingType.enabled, []]
    });
  }

  onSubmit({ value, valid }: { value: IShippingType, valid: boolean }) {

    if (valid) {
      this.shippingTypeService.updateShippingType(this.data.shippingType.id, value).subscribe(
        res => {
          this.dialogRef.close({ data: 'SAVE_BUTTON_CLICKED' });
        },
        err => {
          console.log("Error saving SHIPPING TYPE", value);
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
  get imageField() {
    return this.form.get('image');
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
