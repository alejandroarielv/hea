import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { MeasurementUnitsService } from '../services/measurementUnits-service.service';

@Injectable()
export class MeasurementUnitListResolver implements Resolve<any> {

    constructor(private service: MeasurementUnitsService) {
    }

    resolve() {
        return this.service.getMeasurementUnits();
    }

}
