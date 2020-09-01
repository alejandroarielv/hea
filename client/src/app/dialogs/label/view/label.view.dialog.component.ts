import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { LabelsService } from '../../../services/labels-service.service';

@Component({
  selector: 'app-label-view-dialog',
  templateUrl: 'label.view.dialog.html',
  styleUrls: ['label.view.dialog.css']
})

export class LabelViewDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LabelViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private labelService: LabelsService
  ) {
    dialogRef.disableClose = true;
  }

  closeClick() {
    this.dialogRef.close({ data: 'CANCEL_BUTTON_CLICKED' });
  }

  deleteClick() {
    this.labelService.deleteLabel(this.data.label.id).subscribe(
      res => {
        this.dialogRef.close({ data: 'DELETE_BUTTON_CLICKED' });
      },
      err => {
        console.log("Error deleting LABEL ID: ", this.data.label.id);
        this.dialogRef.close({ data: 'ERROR' });
      }
    );
  }

}
