import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { LabelsService } from '../services/labels-service.service';

@Injectable()
export class LabelListResolver implements Resolve<any> {

    constructor(private service: LabelsService) {
    }

    resolve() {
        return this.service.getLabels();
    }

}
