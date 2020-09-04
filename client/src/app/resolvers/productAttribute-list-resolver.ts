import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ProductAttributesService } from '../services/productAttributes-service.service';

@Injectable()
export class ProductAttributeListResolver implements Resolve<any> {

    constructor(private service: ProductAttributesService) {
    }

    resolve() {
        return this.service.getProductAttributes();
    }

}
