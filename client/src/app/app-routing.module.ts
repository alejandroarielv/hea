import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LabelFormComponent } from './components/label-form/label-form.component';
import { LabelListComponent } from './components/label-list/label-list.component';
import { LabelListResolver } from './resolvers/label-list-resolver';

import { WeightUnitFormComponent } from './components/weightUnit-form/weightUnit-form.component';
import { WeightUnitListComponent } from './components/weightUnit-list/weightUnit-list.component';
import { WeightUnitListResolver } from './resolvers/weightUnit-list-resolver';

import { MeasurementUnitFormComponent } from './components/measurementUnit-form/measurementUnit-form.component';
import { MeasurementUnitListComponent } from './components/measurementUnit-list/measurementUnit-list.component';
import { MeasurementUnitListResolver } from './resolvers/measurementUnit-list-resolver';

import { ShippingTypeFormComponent } from './components/shippingType-form/shippingType-form.component';
import { ShippingTypeListComponent } from './components/shippingType-list/shippingType-list.component';
import { ShippingTypeListResolver } from './resolvers/shippingType-list-resolver';

const routes: Routes = [

  // Default path
  {
    path: '',
    redirectTo: '/labels',
    pathMatch: 'full'
  },

  // Beginning paths
  {
    path: 'labels',
    component: LabelListComponent,
    resolve: { labels: LabelListResolver } 
  },
  {
    path: 'labels/add',
    component: LabelFormComponent
  },
  {
    path: 'labels/edit/:id',
    component: LabelFormComponent
  },

  {
    path: 'weightUnits',
    component: WeightUnitListComponent,
    resolve: { weightUnits: WeightUnitListResolver } 
  },
  {
    path: 'weightUnits/add',
    component: WeightUnitFormComponent
  },
  {
    path: 'weightUnits/edit/:id',
    component: WeightUnitFormComponent
  },

  {
    path: 'measurementUnits',
    component: MeasurementUnitListComponent,
    resolve: { measurementUnits: MeasurementUnitListResolver } 
  },
  {
    path: 'measurementUnits/add',
    component: MeasurementUnitFormComponent
  },
  {
    path: 'measurementUnits/edit/:id',
    component: MeasurementUnitFormComponent
  },

  {
    path: 'shippingTypes',
    component: ShippingTypeListComponent,
    resolve: { shippingTypes: ShippingTypeListResolver } 
  },
  {
    path: 'shippingTypes/add',
    component: ShippingTypeFormComponent
  },
  {
    path: 'shippingTypes/edit/:id',
    component: ShippingTypeFormComponent
  }
 
  // End paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
