import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ShippingTypesService } from '../../../services/shippingTypes-service.service';

@Component({
  selector: 'app-shippingType-view-dialog',
  templateUrl: 'shippingType.view.dialog.html',
  styleUrls: ['shippingType.view.dialog.css']
})

export class ShippingTypeViewDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ShippingTypeViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private shippingTypeService: ShippingTypesService
  ) {
  }

  closeClick() {
    this.dialogRef.close({ data: 'CANCEL_BUTTON_CLICKED' });
  }

  deleteClick() {
    this.shippingTypeService.deleteShippingType(this.data.shippingType.id).subscribe(
      res => {
        this.dialogRef.close({ data: 'DELETE_BUTTON_CLICKED' });
      },
      err => {
        console.log("Error deleting SHIPPING TYPE ID: ", this.data.shippingType.id);
        this.dialogRef.close({ data: 'ERROR' });
      }
    );
  }

}
