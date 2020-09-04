import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { ProductAttributesService } from '../../../services/productAttributes-service.service';
import { IProductAttribute } from '../../../models/productAttribute';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-productAttribute-add-dialog',
  templateUrl: 'productAttribute.add.dialog.html',
  styleUrls: ['productAttribute.add.dialog.css']
})

export class ProductAttributeAddDialogComponent {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProductAttributeAddDialogComponent>,
    private productAttributeService: ProductAttributesService,
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

  onSubmit({ value, valid }: { value: IProductAttribute, valid: boolean }) {

    if (valid) {
      this.productAttributeService.saveProductAttribute(value).subscribe(
        res => {
          this.dialogRef.close({ data: 'ADD_BUTTON_CLICKED' });
        },
        err => {
          console.log("Error adding BRAND ", value);
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
