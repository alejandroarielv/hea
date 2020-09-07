import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatSelect } from "@angular/material/select";

@Component({
    selector: "chips-selection",
    templateUrl: "chips-selection.html",
    styleUrls: ["chips-selection.scss"]
})

export class ChipsSelection implements OnInit {

    @Input("label") label: string;
    @Input("allData") allData: string[];

    visible = true;
    selectable = true;
    removable = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];

    formDataCtrl = new FormControl([]);

    constructor() {}

    ngOnInit() {
    }

    onRemove(multiSelect: MatSelect, matChipIndex: number) {
        const selectedData = [...this.formDataCtrl.value];
        selectedData.splice(matChipIndex, 1);
        this.formDataCtrl.patchValue(selectedData);

        multiSelect.writeValue(selectedData);
    }

}
