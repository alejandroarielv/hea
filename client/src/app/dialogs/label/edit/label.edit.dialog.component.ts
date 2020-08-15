import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { LabelsService } from '../../../services/labels-service.service';
import { ILabel } from '../../../models/label';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-label-edit-dialog',
  templateUrl: 'label.edit.dialog.html',
  styleUrls: ['label.edit.dialog.css']
})

export class LabelEditDialogComponent {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LabelEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private labelService: LabelsService,
    private formBuilder: FormBuilder,
  ) {
    dialogRef.disableClose = true;
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      description: [this.data.label.description, [Validators.required, Validators.minLength(5)]],
      shortDescription: [this.data.label.shortDescription, [Validators.required, Validators.minLength(5)]],
      image: [this.data.label.image, []],
      enabled: [this.data.label.enabled, []]
    });
  }

  onSubmit({ value, valid }: { value: ILabel, valid: boolean }) {

    if (valid) {
      this.labelService.updateLabel(this.data.label.id, value).subscribe(
        res => {
          this.dialogRef.close({ data: 'SAVE_BUTTON_CLICKED' });
        },
        err => {
          console.log("Error saving LABEL", value);
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
  get imageField() {
    return this.form.get('image');
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
