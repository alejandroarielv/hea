import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatSelect } from "@angular/material/select";
import { IDataToSelect } from './IDataToSelect-chips-selection';

@Component({
    selector: "chips-selection",
    templateUrl: "chips-selection.html",
    styleUrls: ["chips-selection.scss"]
})

export class ChipsSelection {

    @Input("label") label: string;
    @Input("dataToSelect") dataToSelect: IDataToSelect[];

    removable = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];

    formDataCtrl = new FormControl([]);

    constructor() { }

    getSelectedItems(): IDataToSelect[] {
        const selectedData = [...this.formDataCtrl.value];
        return this.dataToSelect.filter((dataToSelect) => selectedData.includes(dataToSelect.value));
    }

    onRemove(multiSelect: MatSelect, matChipIndex: number) {
        const selectedData = [...this.formDataCtrl.value];
        selectedData.splice(matChipIndex, 1);
        this.formDataCtrl.patchValue(selectedData);

        multiSelect.writeValue(selectedData);
    }

}
