import { Component, Input, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { IProductFeature } from '../../models/product-feature';
import { IProductAttribute } from '../../models/productAttribute';
import { ProductAttributesService } from '../../services/productAttributes-service.service';
import { ProductFeaturesService } from '../../services/product-features-service.service';

@Component({
    selector: "product-feature",
    templateUrl: "product-feature.html",
    styleUrls: ["product-feature.scss"]
})

export class ProductFeatureComponent implements OnInit {

    @Input("productID") productID: number;

    productFeatures: IProductFeature[] = [];
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
            productAttributeID: ['', [Validators.required]],
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
                res => this.productFeatures = res.productFeatures
            );
        }
    }


    pushProductFeatureClick() {
        //Check dont let insert duplicate attributes
        const productAttributeIDToAdd: number = this.form.controls.productAttributeID.value;
        if ((this.productFeatures.findIndex(el => el.productAttribute.id == productAttributeIDToAdd)) != -1) return;

        //id = -1 are new records 
        //id = -2 are old records deleted
        const newProductFeature: IProductFeature = {
            id: -1,
            productID: 0,
            productAttribute: this.productAttributes.
                filter(productAttribute => productAttribute.id == productAttributeIDToAdd)[0],
            about: this.form.controls.about.value,
        };

        this.productFeatures.push(newProductFeature);
        this.buildForm();
    }


    deleteProductFeatureClick(index) {
        //id = -1 are new records 
        //id = -2 are old records deleted
        this.productFeatures[index].id = -2;
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
