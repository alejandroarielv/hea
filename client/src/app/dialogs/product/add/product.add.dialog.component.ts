import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products-service.service';
import { BrandsService } from '../../../services/brands-service.service';

import { IProduct } from '../../../models/product';
import { IBrand } from '../../../models/brand';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-add-dialog',
  templateUrl: 'product.add.dialog.html',
  styleUrls: ['product.add.dialog.css']
})

export class ProductAddDialogComponent implements OnInit {

  form: FormGroup;
  brands: IBrand[];

  constructor(
    public dialogRef: MatDialogRef<ProductAddDialogComponent>,
    private productService: ProductsService,
    private brandService: BrandsService,
    private formBuilder: FormBuilder,
  ) {
    dialogRef.disableClose = true;
    this.buildForm();
  }

  ngOnInit() {
    this.getBrands();
  }

  private getBrands() {
    this.brandService.getBrands().subscribe(
      data => { this.brands = data.brands; }
    );
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      sku: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      shortDescription: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      about: ['', []],
      barCode: ['', []],
      minimunStock: ['0', [Validators.required, Validators.minLength(1), Validators.min(0), Validators.max(99999)]],
      maximunStock: ['0', [Validators.required, Validators.minLength(1), Validators.min(0), Validators.max(99999)]],
      criticalStock: ['0', [Validators.required, Validators.minLength(1), Validators.min(0), Validators.max(99999)]],
      brandID: ['', [Validators.required]],
      image: ['', []],
      enabled: ['', []]
    });
  }

  onSubmit({ value, valid }: { value: IProduct, valid: boolean }) {

    if (valid) {
      this.productService.saveProduct(value).subscribe(
        res => {
          this.dialogRef.close({ data: 'ADD_BUTTON_CLICKED' });
        },
        err => {
          console.log("Error adding LABEL", value);
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
  get skuField() {
    return this.form.get('sku');
  }

  get descriptionField() {
    return this.form.get('description');
  }

  get shortDescriptionField() {
    return this.form.get('shortDescription');
  }

  get aboutField() {
    return this.form.get('about');
  }

  get barCodeField() {
    return this.form.get('barCode');
  }

  get minimunStockField() {
    return this.form.get('minimunStock');
  }

  get criticalStockField() {
    return this.form.get('criticalStock');
  }

  get maximunStockField() {
    return this.form.get('maximunnStock');
  }

  get brandIDField() {
    return this.form.get('brandID');
  }

  get imageField() {
    return this.form.get('image');
  }
  get enabledField() {
    return this.form.get('enabled');
  }

}
