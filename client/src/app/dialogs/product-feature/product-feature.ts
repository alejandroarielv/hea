import { Component, Input, OnInit } from "@angular/core";
import { FormControl, Validators, FormBuilder, FormGroup } from "@angular/forms";
import { IProductFeature } from '../../models/product-feature';
import { IProductAttribute } from '../../models/productAttribute';
import { ProductAttributesService } from '../../services/productAttributes-service.service';


@Component({
    selector: "product-feature",
    templateUrl: "product-feature.html",
    styleUrls: ["product-feature.scss"]
})

export class ProductFeatureComponent implements OnInit {

    //@Input("productFeatures") 
    productFeatures: IProductFeature[] = [];

    productAttributes: IProductAttribute[] = [];

    form: FormGroup;

    constructor(
        private productAttributesService: ProductAttributesService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.buildForm();
        this.getProductAttributes();
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


    pushProductFeatureClick() {

        console.log('form ', this.form);

        //Check dont let insert duplicate attributes
        const productAttributeIDToAdd: number = this.form.controls.productAttributeID.value;
        if ((this.productFeatures.findIndex(el => el.productAttribute.id == productAttributeIDToAdd)) != -1) return;

        //id = -1 are new records
        const newProductFeature: IProductFeature = {
            id: -1,
            productID: 0,
            productAttribute: {
                id: this.form.controls.productAttributeID.value,
                description: 'des',
                shortDescription: 'sdes',
                enabled: true,
            },
            about: this.form.controls.about.value,
        };

        this.productFeatures.push(newProductFeature);
        this.form.reset(this.form.controls.productAttributeID);
        this.form.reset(this.form.controls.about);
    }


    deleteProductFeatureClick(index) { 
        this.productFeatures.splice(index, 1);
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
