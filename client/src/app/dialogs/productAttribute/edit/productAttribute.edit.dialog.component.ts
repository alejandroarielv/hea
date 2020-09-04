import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ProductAttributesService } from '../../../services/productAttributes-service.service';
import { IProductAttribute } from '../../../models/productAttribute';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-productAttribute-edit-dialog',
  templateUrl: 'productAttribute.edit.dialog.html',
  styleUrls: ['productAttribute.edit.dialog.css']
})

export class ProductAttributeEditDialogComponent {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProductAttributeEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productAttributeService: ProductAttributesService,
    private formBuilder: FormBuilder,
  ) {
    dialogRef.disableClose = true;
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      description: [this.data.productAttribute.description, [Validators.required, Validators.minLength(5)]],
      shortDescription: [this.data.productAttribute.shortDescription, [Validators.required, Validators.minLength(5)]],
      enabled: [this.data.productAttribute.enabled, []]
    });
  }

  onSubmit({ value, valid }: { value: IProductAttribute, valid: boolean }) {

    if (valid) {
      this.productAttributeService.updateProductAttribute(this.data.productAttribute.id, value).subscribe(
        res => {
          this.dialogRef.close({ data: 'SAVE_BUTTON_CLICKED' });
        },
        err => {
          console.log("Error saving BRAND ", value);
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
