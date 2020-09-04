import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ProductAttributesService } from '../../../services/productAttributes-service.service';

@Component({
  selector: 'app-productAttribute-view-dialog',
  templateUrl: 'productAttribute.view.dialog.html',
  styleUrls: ['productAttribute.view.dialog.css']
})

export class ProductAttributeViewDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ProductAttributeViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productAttributeService: ProductAttributesService
  ) {
  }

  closeClick() {
    this.dialogRef.close({ data: 'CANCEL_BUTTON_CLICKED' });
  }

  deleteClick() {
    this.productAttributeService.deleteProductAttribute(this.data.productAttribute.id).subscribe(
      res => {
        this.dialogRef.close({ data: 'DELETE_BUTTON_CLICKED' });
      },
      err => {
        console.log("Error deleting BRAND ID: ", this.data.productAttribute.id);
        this.dialogRef.close({ data: 'ERROR' });
      }
    );
  }

}
