import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ProductsService } from '../../../services/products-service.service';

@Component({
  selector: 'app-product-view-dialog',
  templateUrl: 'product.view.dialog.html',
  styleUrls: ['product.view.dialog.css']
})

export class ProductViewDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ProductViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductsService
  ) {
    dialogRef.disableClose = true;
  }

  closeClick() {
    this.dialogRef.close({ data: 'CANCEL_BUTTON_CLICKED' });
  }

  deleteClick() {
    this.productService.deleteProduct(this.data.product.id).subscribe(
      res => {
        this.dialogRef.close({ data: 'DELETE_BUTTON_CLICKED' });
      },
      err => {
        console.log("Error deleting LABEL ID: ", this.data.product.id);
        this.dialogRef.close({ data: 'ERROR' });
      }
    );
  }

}
