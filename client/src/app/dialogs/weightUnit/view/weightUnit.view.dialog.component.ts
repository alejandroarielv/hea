import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { WeightUnitsService } from '../../../services/weightUnits-service.service';

@Component({
  selector: 'app-weightUnit-view-dialog',
  templateUrl: 'weightUnit.view.dialog.html',
  styleUrls: ['weightUnit.view.dialog.css']
})

export class WeightUnitViewDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<WeightUnitViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private weightUnitService: WeightUnitsService
  ) {
  }

  closeClick() {
    this.dialogRef.close({ data: 'CANCEL_BUTTON_CLICKED' });
  }

  deleteClick() {
    this.weightUnitService.deleteWeightUnit(this.data.weightUnit.id).subscribe(
      res => {
        this.dialogRef.close({ data: 'DELETE_BUTTON_CLICKED' });
      },
      err => {
        console.log("Error deleting WEIGHT UNIT ID: ", this.data.weightUnit.id);
        this.dialogRef.close({ data: 'ERROR' });
      }
    );
  }

}
