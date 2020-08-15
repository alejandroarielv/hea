import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { LabelsService } from '../../../services/labels-service.service';
import { ILabel } from '../../../models/label';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-label-add-dialog',
  templateUrl: 'label.add.dialog.html',
  styleUrls: ['label.add.dialog.css']
})

export class LabelAddDialogComponent {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LabelAddDialogComponent>,
    private labelService: LabelsService,
    private formBuilder: FormBuilder,
  ) {
    dialogRef.disableClose = true;
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(5)]],
      shortDescription: ['', [Validators.required, Validators.minLength(5)]],
      image: ['', []],
      enabled: ['', []]
    });
  }

  onSubmit({ value, valid }: { value: ILabel, valid: boolean }) {

    if (valid) {
      this.labelService.saveLabel(value).subscribe(
        res => {
          this.dialogRef.close({ data: 'ADD_BUTTON_CLICKED' });
        },
        err => {
          console.log("Error adding LABEL", value);
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
  get imageField() {
    return this.form.get('image');
  }
  get enabledField() {
    return this.form.get('enabled');
  }

}
