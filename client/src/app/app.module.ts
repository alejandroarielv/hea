import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { NavigationComponent } from './components/navigation/navigation.component';

import { LabelListComponent } from './components/label-list/label-list.component';
import { LabelListResolver } from './resolvers/label-list-resolver';
import { LabelViewDialogComponent } from './dialogs/label/view/label.view.dialog.component';
import { LabelAddDialogComponent } from './dialogs/label/add/label.add.dialog.component';
import { LabelEditDialogComponent } from './dialogs/label/edit/label.edit.dialog.component';

import { WeightUnitsListComponent } from './components/weightUnits-list/weightUnits-list.component';
import { WeightUnitsListResolver } from './resolvers/weightUnits-list-resolver';
import { WeightUnitsViewDialogComponent } from './dialogs/weightUnits/view/weightUnits.view.dialog.component';
import { WeightUnitsAddDialogComponent } from './dialogs/weightUnits/add/weightUnits.add.dialog.component';
import { WeightUnitsEditDialogComponent } from './dialogs/weightUnits/edit/weightUnits.edit.dialog.component';

import { MeasurementUnitsListComponent } from './components/measurementUnits-list/measurementUnits-list.component';
import { MeasurementUnitsListResolver } from './resolvers/measurementUnits-list-resolver';
import { MeasurementUnitsViewDialogComponent } from './dialogs/measurementUnits/view/measurementUnits.view.dialog.component';
import { MeasurementUnitsAddDialogComponent } from './dialogs/measurementUnits/add/measurementUnits.add.dialog.component';
import { MeasurementUnitsEditDialogComponent } from './dialogs/measurementUnits/edit/weightUnits.edit.dialog.component';

import { ShippingTypesListComponent } from './components/shippingTypes-list/shippingTypes-list.component';
import { ShippingTypesListResolver } from './resolvers/shippingTypes-list-resolver';
import { ShippingTypesViewDialogComponent } from './dialogs/shippingTypes/view/shippingTypes.view.dialog.component';
import { ShippingTypesAddDialogComponent } from './dialogs/shippingTypes/add/shippingTypes.add.dialog.component';
import { ShippingTypesEditDialogComponent } from './dialogs/shippingTypes/edit/shippingTypes.edit.dialog.component';

import { CsvDataDialogComponent } from './helper/csv-gen/csv-data.dialog.component';
import { ImportDataDialogComponent } from './helper/csv-parser/csv-parser.dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    
    LabelListComponent,
    LabelViewDialogComponent,
    LabelAddDialogComponent,
    LabelEditDialogComponent,

    WeightUnitsListComponent,
    WeightUnitsViewDialogComponent,
    WeightUnitsAddDialogComponent,
    WeightUnitsEditDialogComponent,

    MeasurementUnitsListComponent,
    MeasurementUnitsViewDialogComponent,
    MeasurementUnitsAddDialogComponent,
    MeasurementUnitsEditDialogComponent,

    ShippingTypesListComponent,
    ShippingTypesViewDialogComponent,
    ShippingTypesAddDialogComponent,
    ShippingTypesEditDialogComponent,

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
  providers: [LabelListResolver,
              WeightUnitsListResolver,
              MeasurementUnitsListResolver,
              ShippingTypesListResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
