import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { WeightUnitsService } from '../services/weightUnits-service.service';

@Injectable()
export class WeightUnitListResolver implements Resolve<any> {

    constructor(private service: WeightUnitsService) {
    }

    resolve() {
        return this.service.getWeightUnits();
    }

}
