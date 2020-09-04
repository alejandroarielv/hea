import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { NavComponent } from './components/navigation/nav.component';
import { AboutComponent } from './components/about/about.component';

import { LabelListComponent } from './components/label-list/label-list.component';
import { LabelListResolver } from './resolvers/label-list-resolver';
import { LabelViewDialogComponent } from './dialogs/label/view/label.view.dialog.component';
import { LabelAddDialogComponent } from './dialogs/label/add/label.add.dialog.component';
import { LabelEditDialogComponent } from './dialogs/label/edit/label.edit.dialog.component';

import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandListResolver } from './resolvers/brand-list-resolver';
import { BrandViewDialogComponent } from './dialogs/brand/view/brand.view.dialog.component';
import { BrandAddDialogComponent } from './dialogs/brand/add/brand.add.dialog.component';
import { BrandEditDialogComponent } from './dialogs/brand/edit/brand.edit.dialog.component';

import { MeasurementUnitListComponent } from './components/measurementUnit-list/measurementUnit-list.component';
import { MeasurementUnitListResolver } from './resolvers/measurementUnit-list-resolver';
import { MeasurementUnitViewDialogComponent } from './dialogs/measurementUnit/view/measurementUnit.view.dialog.component';
import { MeasurementUnitAddDialogComponent } from './dialogs/measurementUnit/add/measurementUnit.add.dialog.component';
import { MeasurementUnitEditDialogComponent } from './dialogs/measurementUnit/edit/measurementUnit.edit.dialog.component';

import { ShippingTypeListComponent } from './components/shippingType-list/shippingType-list.component';
import { ShippingTypeListResolver } from './resolvers/shippingType-list-resolver';
import { ShippingTypeViewDialogComponent } from './dialogs/shippingType/view/shippingType.view.dialog.component';
import { ShippingTypeAddDialogComponent } from './dialogs/shippingType/add/shippingType.add.dialog.component';
import { ShippingTypeEditDialogComponent } from './dialogs/shippingType/edit/shippingType.edit.dialog.component';

import { ProductAttributeListComponent } from './components/productAttribute-list/productAttribute-list.component';
import { ProductAttributeListResolver } from './resolvers/productAttribute-list-resolver';
import { ProductAttributeViewDialogComponent } from './dialogs/productAttribute/view/productAttribute.view.dialog.component';
import { ProductAttributeAddDialogComponent } from './dialogs/productAttribute/add/productAttribute.add.dialog.component';
import { ProductAttributeEditDialogComponent } from './dialogs/productAttribute/edit/productAttribute.edit.dialog.component';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductViewDialogComponent } from './dialogs/product/view/product.view.dialog.component';
import { ProductAddDialogComponent } from './dialogs/product/add/product.add.dialog.component';
import { ProductEditDialogComponent } from './dialogs/product/edit/product.edit.dialog.component';

import { CsvDataDialogComponent } from './helper/csv-gen/csv-data.dialog.component';
import { ImportDataDialogComponent } from './helper/csv-parser/csv-parser.dialog.component';

@NgModule({
  declarations: [
    AppComponent,

    NavComponent,
    AboutComponent,

    LabelListComponent,
    LabelViewDialogComponent,
    LabelAddDialogComponent,
    LabelEditDialogComponent,

    BrandListComponent,
    BrandViewDialogComponent,
    BrandAddDialogComponent,
    BrandEditDialogComponent,

    MeasurementUnitListComponent,
    MeasurementUnitViewDialogComponent,
    MeasurementUnitAddDialogComponent,
    MeasurementUnitEditDialogComponent,

    ShippingTypeListComponent,
    ShippingTypeViewDialogComponent,
    ShippingTypeAddDialogComponent,
    ShippingTypeEditDialogComponent,

    ProductAttributeListComponent,
    ProductAttributeViewDialogComponent,
    ProductAttributeAddDialogComponent,
    ProductAttributeEditDialogComponent,

    ProductListComponent,
    ProductViewDialogComponent,
    ProductAddDialogComponent,
    ProductEditDialogComponent,

    CsvDataDialogComponent,
    ImportDataDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  entryComponents: [
  ],
  providers: [
    LabelListResolver,
    BrandListResolver,
    MeasurementUnitListResolver,
    ShippingTypeListResolver,
    ProductAttributeListResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
