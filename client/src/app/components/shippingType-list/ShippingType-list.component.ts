import { Component, OnInit, ViewChild } from '@angular/core';
import { IShippingType } from '../../models/shippingType';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ShippingTypeViewDialogComponent } from '../../dialogs/shippingType/view/shippingType.view.dialog.component';
import { ShippingTypeAddDialogComponent } from '../../dialogs/shippingType/add/shippingType.add.dialog.component';
import { ShippingTypeEditDialogComponent } from '../../dialogs/shippingType/edit/shippingType.edit.dialog.component';
import { ActivatedRoute } from '@angular/router';
import { ShippingTypesService } from '../../services/shippingTypes-service.service';
import { CsvDataDialogComponent } from '../../helper/csv-gen/csv-data.dialog.component';
import { ImportDataDialogComponent } from '../../helper/csv-parser/csv-parser.dialog.component';
import { Papa } from 'ngx-papaparse';

//pdfMake
const pdfMakeX = require('pdfmake/build/pdfmake.js');
const pdfFontsX = require('pdfmake-unicode/dist/pdfmake-unicode.js');
pdfMakeX.vfs = pdfFontsX.pdfMake.vfs;
import * as pdfMake from 'pdfmake/build/pdfmake';
//pdfMake


@Component({
  selector: 'app-shippingType-list',
  templateUrl: './shippingType-list.component.html',
  styleUrls: ['./shippingType-list.component.scss']
})
export class ShippingTypeListComponent {

  data: IShippingType[] = [];
  displayedColumns: string[] = ['id', 'description', 'shortDescription', 'enabled', 'options'];
  dataSource = new MatTableDataSource(this.data);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private shippingTypeService: ShippingTypesService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private papa: Papa) {
  }

  ngOnInit() {
    this.data = this.activatedRoute.snapshot.data.shippingTypes.shippingTypes;
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
    const shippingType = this.data[foundIndex];
    this.dialog.open(ShippingTypeViewDialogComponent, { data: { shippingType, isDeleteMode } });
  }

  addClick(): void {
    const dialogRef = this.dialog.open(ShippingTypeAddDialogComponent);

    dialogRef.afterClosed().subscribe(
      res => {
        if (res.data == "ADD_BUTTON_CLICKED") {
          this.refreshTable();
        }
      });
  }

  editClick(id: number): void {
    const foundIndex = this.data.findIndex(elemen => elemen.id == id);
    const shippingType = this.data[foundIndex];
    const dialogRef = this.dialog.open(ShippingTypeEditDialogComponent, { data: { shippingType } });

    dialogRef.afterClosed().subscribe(
      res => {
        if (res.data == "SAVE_BUTTON_CLICKED") {
          this.refreshTable();
        }
      });
  }

  deleteClick(id: number): void {
    const isDeleteMode = true;
    const foundIndex = this.data.findIndex(elemen => elemen.id == id);
    const shippingType = this.data[foundIndex];
    const dialogRef = this.dialog.open(ShippingTypeViewDialogComponent, { data: { shippingType, isDeleteMode } });

    dialogRef.afterClosed().subscribe(
      res => {
        if (res.data == "DELETE_BUTTON_CLICKED") {
          this.refreshTable();
        }
      });
  }

  refreshTable() {
    this.shippingTypeService.getShippingTypes().subscribe(
      res => {
        this.data = res.shippingTypes;
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

    var newShippingType: IShippingType;

    //index 0 has column names    
    for (let index = 1; index < dataToImport.length; index++) {
      const element = dataToImport[index];

      newShippingType = {
        description: element[1],
        shortDescription: element[2],
        enabled: element[3] == '1'
      }

      this.shippingTypeService.saveShippingType(newShippingType).subscribe(
        res => { },
        err => console.log("Error adding shipping type", newShippingType)
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
    pdfMake.createPdf(docDefinition).download('shippingTypes.pdf');
  }

  getPDFObjectDefinition() {
    return {
      //pageSize: 'LEGAL'
      //pageOrientation: 'landscape',
      content: [
        {
          text: 'BRANDS LIST', style: 'header',
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

  getDataObjectDescription(data: IShippingType[]) {
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

}
