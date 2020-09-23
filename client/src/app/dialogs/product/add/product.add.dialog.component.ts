import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
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
import { ChipsSelection } from '../../../helper/chips-selection/chips-selection';
import { ProductFeatureComponent } from '../../../dialogs/product-feature/product-feature';

import { ProductLabelsService } from '../../../services/product-labels-service.service';
import { ProductShippingTypesService } from '../../../services/product-shippingTypes-service.service';

import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { IProductLabel } from 'src/app/models/product-label';
import { IProductShippingType } from 'src/app/models/product-shippingType';

@Component({
  selector: 'app-product-add-dialog',
  templateUrl: 'product.add.dialog.html',
  styleUrls: ['product.add.dialog.css']
})

export class ProductAddDialogComponent implements OnInit {

  @ViewChildren(ChipsSelection) childProductMultipleSelections: QueryList<ChipsSelection>;
  @ViewChild(ProductFeatureComponent) childProductFeatures: ProductFeatureComponent;

  regEx_OnlyNumbers = '^[0-9]+$';
  regEx_Empty_OR_OnlyNumbers = '(^[0-9]+$|^$)';

  form: FormGroup;

  labels: ILabel[];
  productLabels: IProductLabel[];
  labelsToSelect: IDataToSelect[] = [];

  shippingTypes: IShippingType[];
  productShippingTypes: IProductShippingType[];
  shippingTypesToSelect: IDataToSelect[] = [];

  brands: IBrand[];
  measurementUnits: IMeasurementUnit[];

  constructor(
    public dialogRef: MatDialogRef<ProductAddDialogComponent>,
    private productService: ProductsService,
    private productLabelsService: ProductLabelsService,
    private productShippingTypesService: ProductShippingTypesService,
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
    //this.getProductLabels();

    this.getShippingTypes();
    //this.getProductShippingTypes();

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

  // private getProductLabels() {
  //   this.productLabelsService.getProductLabels(0).subscribe(
  //     data => {
  //       this.productLabels = data.productLabels;
  //     }
  //   );
  // }

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

  // private getProductShippingTypes() {
  //   this.productShippingTypesService.getProductShippingTypes(0).subscribe(
  //     data => {
  //       this.productShippingTypes = data.productShippingTypes;
  //     }
  //   );
  // }

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
      sku: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      barCode: ['', [Validators.maxLength(12), Validators.pattern(this.regEx_Empty_OR_OnlyNumbers)]],
      brandID: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      shortDescription: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      about: ['', [Validators.maxLength(500)]],
      minimunStock: ['0', [Validators.required, Validators.min(0), Validators.max(99999), Validators.pattern(this.regEx_OnlyNumbers)]],
      maximunStock: ['0', [Validators.required, Validators.min(0), Validators.max(99999), Validators.pattern(this.regEx_OnlyNumbers)]],
      criticalStock: ['0', [Validators.required, Validators.min(0), Validators.max(99999), Validators.pattern(this.regEx_OnlyNumbers)]],
      image: ['', []],
      contentQuantity: ['1', [Validators.required, Validators.min(1), Validators.max(999), Validators.pattern(this.regEx_OnlyNumbers)]],
      contentMeasurementUnitID: ['', [Validators.required]],
      enabledToBuy: ['true', []],
      enabledToSell: ['true', []]
    });
  }

  onSubmit({ value, valid }: { value: IProduct, valid: boolean }) {

    if (valid) {

      console.log('PF ', this.childProductFeatures.productFeatures);
      console.log('CPms ', this.childProductMultipleSelections.first.getSelectedItems());
      console.log('CPms ', this.childProductMultipleSelections.last.getSelectedItems());

      this.productService.saveProduct(value).subscribe(
        res => {
          const data: any = res;

          if (data.newID && data.newID[0].ID && parseInt(data.newID[0].ID) > 0) {

            const newProductID: number = parseInt(data.newID[0].ID);

            const labelChipsSelected = this.childProductMultipleSelections.first.getSelectedItems();
            var newProductLabels: IProductLabel[] = [];
            var dltProductLabels: IProductLabel[] = [];

            //Detect removed labels 
            this.productLabels.forEach(elm => {
              if (labelChipsSelected.findIndex(chp => chp.key == elm.labelID) == -1) {
                dltProductLabels.push(
                  {
                    id: elm.id,
                    productID: newProductID,
                    labelID: elm.labelID
                  }
                );
              }
            });
            //And delete removed labels
            dltProductLabels.forEach(elm => {
              this.productLabelsService.deleteProductLabel(elm.id).subscribe(
                res => { },
                err => console.error("Error adding LABELS")
                );
            });


            //Detect new labels 
            labelChipsSelected.forEach(elm => {
              if (this.productLabels.findIndex(prdLbl => prdLbl.labelID == elm.key) == -1) {
                newProductLabels.push(
                  {
                    productID: newProductID,
                    labelID: elm.key
                  }
                );
              }
            });
            //And add news
            if(newProductLabels.length > 0 ){
              this.productLabelsService.saveProductLabels(newProductLabels).subscribe(
                res => { },
                err => console.error("Error adding LABELS")
              );
            }

            //Do the same with shippingTypes
            var newProductShippingTypes: IProductShippingType[] = [];
            var dltProductShippingTypes: IProductShippingType[] = [];
            const shippingTypeChipsSelected = this.childProductMultipleSelections.last.getSelectedItems();

            //Detect removed labels 
            this.productShippingTypes.forEach(elm => {
              if (shippingTypeChipsSelected.findIndex(chp => chp.key == elm.shippingTypeID) == -1) {
                dltProductShippingTypes.push(
                  {
                    id: elm.id,
                    productID: newProductID,
                    shippingTypeID: elm.shippingTypeID
                  }
                );
              }
            });
            //And delete removed shippingTypes
            dltProductShippingTypes.forEach(elm => {
              this.productShippingTypesService.deleteProductShippingType(elm.id).subscribe(
                res => { },
                err => console.error("Error adding SHIPPING TYPES")
                );
            });


            //Detect new shippingTypes 
            shippingTypeChipsSelected.forEach(elm => {
              if (this.productShippingTypes.findIndex(prdSht => prdSht.shippingTypeID == elm.key) == -1) {
                newProductShippingTypes.push(
                  {
                    productID: newProductID,
                    shippingTypeID: elm.key
                  }
                );
              }
            });
            //And add news
            if(newProductShippingTypes.length > 0 ){
              this.productShippingTypesService.saveProductShippingTypes(newProductShippingTypes).subscribe(
                res => { },
                err => console.error("Error adding SHIPPING TYPES")
              );
            }

            this.dialogRef.close({ data: 'ADD_BUTTON_CLICKED' });
          }
        },
        err => {
          console.error("Error adding PRODUCT", value);
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
