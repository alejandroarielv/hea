import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ShippingTypesService } from '../services/shippingTypes-service.service';

@Injectable()
export class ShippingTypeListResolver implements Resolve<any> {

    constructor(private service: ShippingTypesService) {
    }

    resolve() {
        return this.service.getShippingTypes();
    }

}
