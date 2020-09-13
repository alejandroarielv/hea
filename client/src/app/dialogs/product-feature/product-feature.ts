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

    //@Input("productFeatures") productFeatures: IProductFeature[];

    productAttributes: IProductAttribute[] = [];

    form: FormGroup;
    formDataCtrl = new FormControl([]);

    constructor(
        private productAttributesService: ProductAttributesService,
        private formBuilder: FormBuilder,
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


    pushProductAttributeClick() {}
    deleteProductAttributeClick() {}

    onSubmit(form) {}

    //Getters form fields
    get productAttributeIDField(){
        return this.form.get('productAttributeID');
    }
    
    get aboutField(){
        return this.form.get('about');
    }

}
