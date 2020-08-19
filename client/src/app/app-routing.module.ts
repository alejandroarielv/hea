import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavigationComponent } from './components/navigation/navigation.component';

import { LabelFormComponent } from './components/label-form/label-form.component';
import { LabelListComponent } from './components/label-list/label-list.component';
import { LabelListResolver } from './resolvers/label-list-resolver';

import { WeightUnitListComponent } from './components/weightUnit-list/weightUnit-list.component';
import { WeightUnitListResolver } from './resolvers/weightUnit-list-resolver';

import { MeasurementUnitListComponent } from './components/measurementUnit-list/measurementUnit-list.component';
import { MeasurementUnitListResolver } from './resolvers/measurementUnit-list-resolver';

import { ShippingTypeListComponent } from './components/shippingType-list/shippingType-list.component';
import { ShippingTypeListResolver } from './resolvers/shippingType-list-resolver';

const routes: Routes = [

  // Default path
  {
    path: '',
    redirectTo: '/hea',
    pathMatch: 'full'
  },

  // Beginning paths
  {
    path: 'hea',
    component: NavigationComponent
  },

  {
    path: 'parametrics', children: [
      { path: 'labels', redirectTo: '/labels' },
      { path: 'weightUnits', redirectTo: '/weightUnits' },
      { path: 'measurementUnits', redirectTo: '/measurementUnits' },
      { path: 'shippingTypes', component: ShippingTypeListComponent }
    ]
  },

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
    path: 'measurementUnits',
    component: MeasurementUnitListComponent,
    resolve: { measurementUnits: MeasurementUnitListResolver }
  },

  {
    path: 'shippingTypes',
    component: ShippingTypeListComponent,
    resolve: { shippingTypes: ShippingTypeListResolver }
  },

  // End paths
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
