import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products-service.service';
import { LabelsService } from '../../../services/labels-service.service';
import { BrandsService } from '../../../services/brands-service.service';
import { MeasurementUnitsService } from '../../../services/measurementUnits-service.service';
import { ShippingTypesService } from '../../../services/shippingTypes-service.service';

import { IProduct } from '../../../models/product';
import { ILabel } from '../../../models/label';
import { IBrand } from '../../../models/brand';
import { IMeasurementUnit } from '../../../models/measurementUnit';
import { IShippingType } from '../../../models/shippingType';
import { IDataToSelect } from '../../../helper/chips-selection/IDataToSelect-chips-selection';

import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-add-dialog',
  templateUrl: 'product.add.dialog.html',
  styleUrls: ['product.add.dialog.css']
})

export class ProductAddDialogComponent implements OnInit {

  form: FormGroup;

  labels: ILabel[];
  labelsToSelect: IDataToSelect[] = [];

  shippingTypes: IShippingType[];
  shippingTypesToSelect: IDataToSelect[] = [];

  brands: IBrand[];
  measurementUnits: IMeasurementUnit[];

  constructor(
    public dialogRef: MatDialogRef<ProductAddDialogComponent>,
    private productService: ProductsService,
    private labelService: LabelsService,
    private shippingTypeService: ShippingTypesService,
    private brandService: BrandsService,
    private measurementUnitService: MeasurementUnitsService,
    private formBuilder: FormBuilder,
  ) {
    dialogRef.disableClose = true;
    this.buildForm();
  }

  ngOnInit() {
    this.getLabels();
    this.getShippingTypes();

    this.getBrands();
    this.getMeasurementUnits();
  }

  private getLabels() {
    this.labelService.getLabels().subscribe(
      data => {
        this.labels = data.labels;
        this.prepareLabelsToSelect();
      }
    );
  }

  private prepareLabelsToSelect() {
    this.labels.forEach(el => {
      this.labelsToSelect.push({ key: el.id, value: el.shortDescription });
    });
  }


  private getShippingTypes() {
    this.shippingTypeService.getShippingTypes().subscribe(
      data => {
        this.shippingTypes = data.shippingTypes;
        this.prepareShippingTypesToSelect();
      }
    );
  }

  private prepareShippingTypesToSelect() {
    this.shippingTypes.forEach(el => {
      this.shippingTypesToSelect.push({ key: el.id, value: el.shortDescription });
    });
  }

  private getBrands() {
    this.brandService.getBrands().subscribe(
      data => { this.brands = data.brands; }
    );
  }

  private getMeasurementUnits() {
    this.measurementUnitService.getMeasurementUnits().subscribe(
      data => { this.measurementUnits = data.measurementUnits; }
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
      contentQuantity: ['1', [Validators.required, Validators.minLength(1), Validators.min(1), Validators.max(999)]],
      contentMeasurementUnitID: ['', [Validators.required]],
      enabledToBuy: ['true', []],
      enabledToSell: ['true', []]
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

  get contentQuantityField() {
    return this.form.get('contentQuantity');
  }

  get contentMeasurementUnitIDField() {
    return this.form.get('contentMeasurementUnitID');
  }


  get enabledToBuyField() {
    return this.form.get('enabledToBuy');
  }
  get enabledToSellField() {
    return this.form.get('enabledToSell');
  }

}
