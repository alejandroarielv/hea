import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { BrandsService } from '../services/brands-service.service';

@Injectable()
export class BrandListResolver implements Resolve<any> {

    constructor(private service: BrandsService) {
    }

    resolve() {
        return this.service.getBrands();
    }

}
