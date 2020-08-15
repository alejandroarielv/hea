import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { ShippingTypesService } from '../../../services/shippingTypes-service.service';
import { IShippingType } from '../../../models/shippingType';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-shippingType-add-dialog',
  templateUrl: 'shippingType.add.dialog.html',
  styleUrls: ['shippingType.add.dialog.css']
})

export class ShippingTypeAddDialogComponent {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ShippingTypeAddDialogComponent>,
    private shippingTypeService: ShippingTypesService,
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

  onSubmit({ value, valid }: { value: IShippingType, valid: boolean }) {

    if (valid) {
      this.shippingTypeService.saveShippingType(value).subscribe(
        res => {
          this.dialogRef.close({ data: 'ADD_BUTTON_CLICKED' });
        },
        err => {
          console.log("Error adding SHIPPING TYPE", value);
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
