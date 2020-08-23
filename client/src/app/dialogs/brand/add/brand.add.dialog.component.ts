import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { BrandsService } from '../../../services/brands-service.service';
import { IBrand } from '../../../models/brand';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-brand-add-dialog',
  templateUrl: 'brand.add.dialog.html',
  styleUrls: ['brand.add.dialog.css']
})

export class BrandAddDialogComponent {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<BrandAddDialogComponent>,
    private brandService: BrandsService,
    private formBuilder: FormBuilder,
  ) {
    dialogRef.disableClose = true;
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(5)]],
      shortDescription: ['', [Validators.required, Validators.minLength(5)]],
      enabled: ['', []]
    });
  }

  onSubmit({ value, valid }: { value: IBrand, valid: boolean }) {

    if (valid) {
      this.brandService.saveBrand(value).subscribe(
        res => {
          this.dialogRef.close({ data: 'ADD_BUTTON_CLICKED' });
        },
        err => {
          console.log("Error adding BRAND ", value);
          this.dialogRef.close({ data: 'ERROR' });
        }
      );
    } else {
      console.log("NOT valid form");
      this.form.markAllAsTouched();
    }
  }

  closeClick() {
    this.dialogRef.close({ data: 'CANCEL_BUTTON_CLICKED' });
  }

  submit() {
    console.log("submited method");
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

}
