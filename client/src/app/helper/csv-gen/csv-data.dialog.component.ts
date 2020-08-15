import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ICsvExportOptions } from '../../helper/csv-gen/csv-export-option';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CsvDataService } from './csv-data.service';
import { IDelimiter } from './delimiter';

@Component({
  selector: 'csv-data-dialog',
  templateUrl: 'csv-data.dialog.html',
  styleUrls: ['csv-data.dialog.css']
})

export class CsvDataDialogComponent {

  form: FormGroup;

  delimiters: IDelimiter[] = [
    { value: ',', viewValue: "Comma ( , )" },
    { value: ';', viewValue: 'Semicolon ( ; )' },
    { value: '|', viewValue: 'Pipe ( | )' },
  ];

  constructor(
    public dialogRef: MatDialogRef<CsvDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {

    dialogRef.disableClose = true;
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      separator: ['', [Validators.required]],
      fileName: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }

  onSubmit({ value, valid }: { value: ICsvExportOptions, valid: boolean }) {

    const separator = value.separator;
    const fileName = value.fileName;

    if (valid) {
      const csvString = CsvDataService.exportToCsv(this.data.this, separator)
      this.download(fileName, csvString);
      this.dialogRef.close({ data: 'EXPORT_BUTTON_CLICKED' });
    } else {
      console.log("NOT valid form");
      this.form.markAllAsTouched();
    }
  }

  download(fileName: string, csvString: string) {

    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, fileName);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

    closeClick() {
      this.dialogRef.close({ data: 'CANCEL_BUTTON_CLICKED' });
    }

    submit() {
      console.log("submited method");
    }

    //Getters form fields
    get separatorField() {
      return this.form.get('separator');
    }
    get fileNameField() {
      return this.form.get('fileName');
    }

  }
