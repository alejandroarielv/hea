import { Component, OnInit, ViewChild } from '@angular/core';
import { ILabel } from '../../models/label';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { LabelViewDialogComponent } from '../../dialogs/label/view/label.view.dialog.component';
import { LabelAddDialogComponent } from '../../dialogs/label/add/label.add.dialog.component';
import { LabelEditDialogComponent } from '../../dialogs/label/edit/label.edit.dialog.component';
import { ActivatedRoute } from '@angular/router';
import { LabelsService } from '../../services/labels-service.service';
import { CsvDataDialogComponent } from '../../helper/csv-gen/csv-data.dialog.component';
import { ImportDataDialogComponent } from '../../helper/csv-parser/csv-parser.dialog.component';
import { Papa } from 'ngx-papaparse';

//pdfMake
const pdfMakeX = require('pdfmake/build/pdfmake.js');
const pdfFontsX = require('pdfmake-unicode/dist/pdfmake-unicode.js');
pdfMakeX.vfs = pdfFontsX.pdfMake.vfs;
import * as pdfMake from 'pdfmake/build/pdfmake';
//pdfMake
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-label-list',
  templateUrl: './label-list.component.html',
  styleUrls: ['./label-list.component.scss']
})
export class LabelListComponent {

  data: ILabel[] = [];
  displayedColumns: string[] = ['id', 'description', 'shortDescription', 'enabled', 'options'];
  dataSource = new MatTableDataSource(this.data);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private labelService: LabelsService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private papa: Papa,
    private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.data = this.activatedRoute.snapshot.data.labels.labels;
    this.dataSource.data = this.data;

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewClick(id: number): void {
    const isDeleteMode = false;
    const foundIndex = this.data.findIndex(elemen => elemen.id == id);
    const label = this.data[foundIndex];
    this.dialog.open(LabelViewDialogComponent, { data: { label, isDeleteMode } });
  }

  addClick(): void {
    const dialogRef = this.dialog.open(LabelAddDialogComponent);

    dialogRef.afterClosed().subscribe(
      res => {
        if (res.data == "ADD_BUTTON_CLICKED") {
          this.openSnackBar('Updated.')
          this.refreshTable();
        }
      });
  }

  editClick(id: number): void {
    const foundIndex = this.data.findIndex(elemen => elemen.id == id);
    const label = this.data[foundIndex];
    const dialogRef = this.dialog.open(LabelEditDialogComponent, { data: { label } });

    dialogRef.afterClosed().subscribe(
      res => {
        if (res.data == "SAVE_BUTTON_CLICKED") {
          this.openSnackBar('Updated.')
          this.refreshTable();
        }
      });
  }

  deleteClick(id: number): void {
    const isDeleteMode = true;
    const foundIndex = this.data.findIndex(elemen => elemen.id == id);
    const label = this.data[foundIndex];
    const dialogRef = this.dialog.open(LabelViewDialogComponent, { data: { label, isDeleteMode } });

    dialogRef.afterClosed().subscribe(
      res => {
        if (res.data == "DELETE_BUTTON_CLICKED") {
          this.refreshTable();
          this.openSnackBar('Updated.')
        }
      });
  }

  refreshTable() {
    this.labelService.getLabels().subscribe(
      res => {
        this.data = res.labels;
        this.dataSource.data = this.data;
        this.dataSource._updateChangeSubscription();
      },
      err => {
        console.log('Error refreshing the table.');
        console.log(err);
      }
    );
  }

  loadDataToImport() {
    const dialogRef = this.dialog.open(ImportDataDialogComponent);

    dialogRef.afterClosed().subscribe(
      res => {

        if (res.data.button == "IMPORT_BUTTON_CLICKED") {

          const csvData = res.data.this;
          const papaResult = this.papa.parse(csvData, {
            complete: (result) => { }
          });

          if (papaResult.data) {
            this.importData(papaResult.data);
            this.refreshTable();
          }

        }
      });
  }


  importData(dataToImport: Array<string>): boolean {

    var newLabel: ILabel;

    //index 0 has column names    
    for (let index = 1; index < dataToImport.length; index++) {
      const element = dataToImport[index];

      newLabel = {
        description: element[1],
        shortDescription: element[2],
        image: element[3],
        enabled: element[4] == '1'
      }

      this.labelService.saveLabel(newLabel).subscribe(
        res => { },
        err => console.log("Error adding LABEL", newLabel)
      );
    }
    return true;
  }

  exportData() {
    if (this.data && this.data.length > 0) {
      const dialogRef = this.dialog.open(CsvDataDialogComponent, { data: { this: this.data } });
    }
  }


  pdfView() {
    const docDefinition = this.getPDFObjectDefinition();
    pdfMake.createPdf(docDefinition).open();
  }

  pdfSave = () => {
    const docDefinition = this.getPDFObjectDefinition();
    pdfMake.createPdf(docDefinition).download('labels.pdf');
  }

  getPDFObjectDefinition() {
    return {
      //pageSize: 'LEGAL'
      //pageOrientation: 'landscape',
      content: [
        {
          text: 'LABELS LIST', style: 'header',
          //alignment: 'right'
        },
        this.getDataObjectDescription(this.data)
      ],

      styles: {
        header: {
          fontSize: 10,
          bold: true
        }
      },
      defaultStyle: {
        fontSize: 8,
        bold: false,
        //alignment: 'center'
      }
    }
  }

  getDataObjectDescription(data: ILabel[]) {
    return {
      table: {
        widths: ['*', '*', '*', '*'],
        body: [
          [{
            text: 'ID',
            style: 'header'
          },
          {
            text: 'DESC',
            style: 'header'
          },
          {
            text: 'SHORT DESC',
            style: 'header'
          },
          {
            text: 'ENABLED',
            style: 'header'
          },
          ],
          ...data.map(el => {
            return [el.description, el.shortDescription, el.created, el.enabled];
          })
        ]
      }
    }
  }

  private openSnackBar(message: string) {
    this._snackBar.open(message, '', { duration: 1000, });
  }

}

