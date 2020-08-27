import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ProductsService } from '../../../services/products-service.service';
import { IProduct } from '../../../models/product';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-edit-dialog',
  templateUrl: 'product.edit.dialog.html',
  styleUrls: ['product.edit.dialog.css']
})

export class ProductEditDialogComponent {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProductEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductsService,
    private formBuilder: FormBuilder,
  ) {
    dialogRef.disableClose = true;
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      description: [this.data.product.description, [Validators.required, Validators.minLength(5)]],
      shortDescription: [this.data.product.shortDescription, [Validators.required, Validators.minLength(5)]],
      image: [this.data.product.image, []],
      enabled: [this.data.product.enabled, []]
    });
  }

  onSubmit({ value, valid }: { value: IProduct, valid: boolean }) {

    if (valid) {
      this.productService.updateProduct(this.data.product.id, value).subscribe(
        res => {
          this.dialogRef.close({ data: 'SAVE_BUTTON_CLICKED' });
        },
        err => {
          console.log("Error saving LABEL", value);
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
