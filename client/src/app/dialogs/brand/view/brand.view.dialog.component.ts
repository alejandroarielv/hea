import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { BrandsService } from '../../../services/brands-service.service';

@Component({
  selector: 'app-brand-view-dialog',
  templateUrl: 'brand.view.dialog.html',
  styleUrls: ['brand.view.dialog.css']
})

export class BrandViewDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<BrandViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private brandService: BrandsService
  ) {
  }

  closeClick() {
    this.dialogRef.close({ data: 'CANCEL_BUTTON_CLICKED' });
  }

  deleteClick() {
    this.brandService.deleteBrand(this.data.brand.id).subscribe(
      res => {
        this.dialogRef.close({ data: 'DELETE_BUTTON_CLICKED' });
      },
      err => {
        console.log("Error deleting BRAND ID: ", this.data.brand.id);
        this.dialogRef.close({ data: 'ERROR' });
      }
    );
  }

}
