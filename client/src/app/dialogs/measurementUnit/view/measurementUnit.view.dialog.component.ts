import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { MeasurementUnitsService } from '../../../services/measurementUnits-service.service';

@Component({
  selector: 'app-measurementUnit-view-dialog',
  templateUrl: 'measurementUnit.view.dialog.html',
  styleUrls: ['measurementUnit.view.dialog.css']
})

export class MeasurementUnitViewDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<MeasurementUnitViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private measurementUnitService: MeasurementUnitsService
  ) {
    dialogRef.disableClose = true;
  }

  closeClick() {
    this.dialogRef.close({ data: 'CANCEL_BUTTON_CLICKED' });
  }

  deleteClick() {
    this.measurementUnitService.deleteMeasurementUnit(this.data.measurementUnit.id).subscribe(
      res => {
        this.dialogRef.close({ data: 'DELETE_BUTTON_CLICKED' });
      },
      err => {
        console.log("Error deleting MEASUREMENT UNIT ID: ", this.data.measurementUnit.id);
        this.dialogRef.close({ data: 'ERROR' });
      }
    );
  }

}
