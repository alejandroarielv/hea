import { Component, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../../models/product';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ProductViewDialogComponent } from '../../dialogs/product/view/product.view.dialog.component';
import { ProductAddDialogComponent } from '../../dialogs/product/add/product.add.dialog.component';
import { ProductEditDialogComponent } from '../../dialogs/product/edit/product.edit.dialog.component';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products-service.service';
import { CsvDataDialogComponent } from '../../helper/csv-gen/csv-data.dialog.component';
import { ImportDataDialogComponent } from '../../helper/csv-parser/csv-parser.dialog.component';
import { Papa } from 'ngx-papaparse';

//pdfMake
const pdfMakeX = require('pdfmake/build/pdfmake.js');
const pdfFontsX = require('pdfmake-unicode/dist/pdfmake-unicode.js');
pdfMakeX.vfs = pdfFontsX.pdfMake.vfs;
import * as pdfMake from 'pdfmake/build/pdfmake';
import { IBrand } from 'src/app/models/brand';
//pdfMake


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit {

  data: IProduct[] = [];
  displayedColumns: string[] = ['id', 'description', 'shortDescription', 'sku', 'enabled', 'options'];
  dataSource = new MatTableDataSource(this.data);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private papa: Papa) {
  }

  ngOnInit() {

    this.productService.getProducts()
      .subscribe( 
        data => {         
          //this.data = this.activatedRoute.snapshot.data.products.products;
console.log('data' ,data);

          this.data = data;
          this.dataSource.data = this.data;
          
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      )
  
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
    const product = this.data[foundIndex];
    this.dialog.open(ProductViewDialogComponent, { data: { product, isDeleteMode } });
  }

  addClick(): void {
    const dialogRef = this.dialog.open(ProductAddDialogComponent);

    dialogRef.afterClosed().subscribe(
      res => {
        if (res.data == "ADD_BUTTON_CLICKED") {
          this.refreshTable();
        }
      });
  }

  editClick(id: number): void {
    const foundIndex = this.data.findIndex(elemen => elemen.id == id);
    const product = this.data[foundIndex];
    const dialogRef = this.dialog.open(ProductEditDialogComponent, { data: { product } });

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
    const product = this.data[foundIndex];
    const dialogRef = this.dialog.open(ProductViewDialogComponent, { data: { product, isDeleteMode } });

    dialogRef.afterClosed().subscribe(
      res => {
        if (res.data == "DELETE_BUTTON_CLICKED") {
          this.refreshTable();
        }
      });
  }

  refreshTable() {
    this.productService.getProducts().subscribe(
      res => {
        this.data = res.products;
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

    var newProduct: IProduct;
    var brand: IBrand;

    //index 0 has column names    
    for (let index = 1; index < dataToImport.length; index++) {
      const element = dataToImport[index];

      brand = {
        id: +element[12],
        description: element[13],
        shortDescription: element[14],
        enabled: element[15] == '1'
      };

      newProduct = {
        description: element[1],
        shortDescription: element[2],
        about: element[3],
        sku: element[4],
        barCode: +element[5],
        minimunStock: +element[6],
        criticalStock: +element[7],
        maximunStock: +element[8],    
        brandID: +element[9],
        enabled: element[10] == '1',
        image: element[11],
        brand: brand
      }

      this.productService.saveProduct(newProduct).subscribe(
        res => { },
        err => console.log("Error adding LABEL", newProduct)
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
    pdfMake.createPdf(docDefinition).download('products.pdf');
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

  getDataObjectDescription(data: IProduct[]) {
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