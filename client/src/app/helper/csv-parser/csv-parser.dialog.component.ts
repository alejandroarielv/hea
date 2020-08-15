import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'csv-parser-dialog',
  templateUrl: 'csv-parser.dialog.html',
  styleUrls: ['csv-parser.dialog.css']
})

export class ImportDataDialogComponent {

  form: FormGroup;

  multiple = false;
  accept = ".csv";

  selectedFile: any;
  fileContent: string|ArrayBuffer = '';

  constructor(
    public dialogRef: MatDialogRef<ImportDataDialogComponent>,
    private formBuilder: FormBuilder) {

    dialogRef.disableClose = true;
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      fileName: ['', [Validators.required]]
    });
  }

  public onChange(fileList: FileList): void {

    if (fileList.length == 1) {
      this.selectedFile = fileList;
      let file = fileList[0];

      this.getFileContent(file)
        .then(
          res => {
            this.fileContent = res;
          })
        .catch(
          err => { console.log('Error in promise', err); });
    }
  }

  getFileContent(file: File): Promise<string | ArrayBuffer> {

    return new Promise((resolve, reject) => {
      let fileReader: FileReader = new FileReader();

      fileReader.onloadend = () => resolve(fileReader.result);
      fileReader.onerror = () => reject();

      fileReader.readAsText(file);
    });
  }

  clearSelectedFile() {
    this.selectedFile = "";
  }

  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (valid) {
      this.dialogRef.close({ data: { button: 'IMPORT_BUTTON_CLICKED', this: this.fileContent } });
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
  get fileNameField() {
    return this.form.get('fileName');
  }

}
