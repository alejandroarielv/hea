import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { BrandsService } from '../../../services/brands-service.service';
import { IBrand } from '../../../models/brand';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-brand-edit-dialog',
  templateUrl: 'brand.edit.dialog.html',
  styleUrls: ['brand.edit.dialog.css']
})

export class BrandEditDialogComponent {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<BrandEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private brandService: BrandsService,
    private formBuilder: FormBuilder,
  ) {
    dialogRef.disableClose = true;
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      description: [this.data.brand.description, [Validators.required, Validators.minLength(5)]],
      shortDescription: [this.data.brand.shortDescription, [Validators.required, Validators.minLength(5)]],
      enabled: [this.data.brand.enabled, []]
    });
  }

  onSubmit({ value, valid }: { value: IBrand, valid: boolean }) {

    if (valid) {
      this.brandService.updateBrand(this.data.brand.id, value).subscribe(
        res => {
          this.dialogRef.close({ data: 'SAVE_BUTTON_CLICKED' });
        },
        err => {
          console.log("Error saving BRAND ", value);
          this.dialogRef.close({ data: 'ERROR' });
        }
      );
    } else {
      console.log("NOT valid form");
      this.form.markAllAsTouched();
    }
  }

  //Getters form fields
  get descriptionField() {
    return this.form.get('description');
  }
  get shortDescriptionField() {
    return this.form.get('shortDescription');
  }
  get enabledField() {
    return this.form.get('enabled');
  }

  closeClick() {
    this.dialogRef.close({ data: 'CANCEL_BUTTON_CLICKED' });
  }

  submit() {
    console.log("submited method");
  }

}
