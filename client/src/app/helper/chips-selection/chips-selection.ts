import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocomplete } from "@angular/material/autocomplete";
//MatAutocompleteSelectedEvent, 
// import { MatChipInputEvent } from "@angular/material/chips";
// import { Observable } from "rxjs";
// import { map, startWith } from "rxjs/operators";
import { MatSelect } from "@angular/material/select";
//, MatSelectChange

@Component({
    selector: "chips-selection",
    templateUrl: "chips-selection.html",
    styleUrls: ["chips-selection.scss"]
})

export class ChipsSelection {
    visible = true;
    selectable = true;
    removable = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];

    fruitCtrl = new FormControl([]);

    label = "Labels";
    fruits: string[] = ["Lemon"];
    allFruits: string[] = ["Apple", "Lemon", "Lime", "Orange", "Strawberry"];

    @ViewChild("fruitInput") fruitInput: ElementRef<HTMLInputElement>;
    @ViewChild("auto") matAutocomplete: MatAutocomplete;

    constructor() { }

    onRemoveFruit(multiSelect: MatSelect, matChipIndex: number) {
        const selectedFruits = [...this.fruitCtrl.value];
        selectedFruits.splice(matChipIndex, 1);
        this.fruitCtrl.patchValue(selectedFruits);

        multiSelect.writeValue(selectedFruits);
    }

}
