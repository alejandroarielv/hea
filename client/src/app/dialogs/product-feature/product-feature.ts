
import { Component, Input, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { IProductFeatureExtended, STATUS } from './product-feature-extended';
import { IProductAttribute } from '../../models/productAttribute';
import { ProductAttributesService } from '../../services/productAttributes-service.service';
import { ProductFeaturesService } from '../../services/product-features-service.service';
import { ProductFeatureValidator } from './productFeatureValidator';

@Component({
    selector: "product-feature",
    templateUrl: "product-feature.html",
    styleUrls: ["product-feature.scss"]
})

export class ProductFeatureComponent implements OnInit {

    @Input("productID") productID: number;

    productFeaturesExtended: IProductFeatureExtended[] = [];
    productAttributes: IProductAttribute[] = [];

    form: FormGroup;

    constructor(
        private productAttributesService: ProductAttributesService,
        private productFeaturesService: ProductFeaturesService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.buildForm();
        this.getProductAttributes();
        this.getProductFeatures();
    }

    private buildForm() {
        this.form = this.formBuilder.group({
            productAttributeID: ['', [Validators.required, 
                                      ProductFeatureValidator.IsDuplicateAttribute(this.form.get('productAttributeID'), this.productFeaturesExtended )]],
            about: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]]
        });
    }


    private getProductAttributes() {
        this.productAttributesService.getProductAttributes().subscribe(
            res => this.productAttributes = res.productAttributes
        );
    }

    private getProductFeatures() {
        if (this.productID != 0) {
            this.productFeaturesService.getProductFeatures(this.productID).subscribe(
                res => this.productFeaturesExtended = res.productFeatures
            );
        }
    }

    addProductFeatureClick() {

        const productAttributeIDToAdd: number = this.form.controls.productAttributeID.value;
        const indexInProductFeatureExtended: number = this.productFeaturesExtended.findIndex(el => el.productAttribute.id == productAttributeIDToAdd);

        //Check dont let insert duplicate attributes. 

        if (indexInProductFeatureExtended == -1) {

            const newProductFeature: IProductFeatureExtended = {
                id: 0,
                productID: this.productID,
                productAttribute: this.productAttributes.
                    filter(productAttribute => productAttribute.id == productAttributeIDToAdd)[0],
                about: this.form.controls.about.value,
                status: STATUS.ADDED
            };

            this.productFeaturesExtended.push(newProductFeature);

        } else {

            //It can exists becouse, was deleted and was not removed. When ID is not 0, it dont remove, only mark as DELETED.

            if (this.productFeaturesExtended[indexInProductFeatureExtended].status == STATUS.DELETED) {

                this.productFeaturesExtended[indexInProductFeatureExtended].about = this.form.controls.about.value,
                    this.productFeaturesExtended[indexInProductFeatureExtended].status = STATUS.UPDATED;

            }
        }

        this.buildForm();
    }


    deleteProductFeatureClick(index) {
        //if its a new feature recently added, but not saved yet, delete it.
        if (this.productFeaturesExtended[index].id == 0) {
            this.productFeaturesExtended.splice(index, 1);
        } else {
            //else mark as deleted to delete later.
            this.productFeaturesExtended[index].status = STATUS.DELETED;
        }
    }

    onSubmit(form) { }

    //Getters form fields
    get productAttributeIDField() {
        return this.form.get('productAttributeID');
    }

    get aboutField() {
        return this.form.get('about');
    }

}
