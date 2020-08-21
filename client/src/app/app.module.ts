import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { NavComponent } from './components/mynavigation/nav.component';
import { AboutComponent } from './components/about/about.component';

import { LabelListComponent } from './components/label-list/label-list.component';
import { LabelListResolver } from './resolvers/label-list-resolver';
import { LabelViewDialogComponent } from './dialogs/label/view/label.view.dialog.component';
import { LabelAddDialogComponent } from './dialogs/label/add/label.add.dialog.component';
import { LabelEditDialogComponent } from './dialogs/label/edit/label.edit.dialog.component';

import { WeightUnitListComponent } from './components/weightUnit-list/weightUnit-list.component';
import { WeightUnitListResolver } from './resolvers/weightUnit-list-resolver';
import { WeightUnitViewDialogComponent } from './dialogs/weightUnit/view/weightUnit.view.dialog.component';
import { WeightUnitAddDialogComponent } from './dialogs/weightUnit/add/weightUnit.add.dialog.component';
import { WeightUnitEditDialogComponent } from './dialogs/weightUnit/edit/weightUnit.edit.dialog.component';

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

    WeightUnitListComponent,
    WeightUnitViewDialogComponent,
    WeightUnitAddDialogComponent,
    WeightUnitEditDialogComponent,

    MeasurementUnitListComponent,
    MeasurementUnitViewDialogComponent,
    MeasurementUnitAddDialogComponent,
    MeasurementUnitEditDialogComponent,

    ShippingTypeListComponent,
    ShippingTypeViewDialogComponent,
    ShippingTypeAddDialogComponent,
    ShippingTypeEditDialogComponent,

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
    LabelAddDialogComponent,
    LabelEditDialogComponent
  ],
  providers: [
    LabelListResolver,
    WeightUnitListResolver,
    MeasurementUnitListResolver,
    ShippingTypeListResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
