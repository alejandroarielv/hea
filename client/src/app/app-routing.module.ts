import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { NavComponent } from './components/navigation/nav.component';

import { LabelListComponent } from './components/label-list/label-list.component';
import { LabelListResolver } from './resolvers/label-list-resolver';

import { WeightUnitListComponent } from './components/weightUnit-list/weightUnit-list.component';
import { WeightUnitListResolver } from './resolvers/weightUnit-list-resolver';

import { MeasurementUnitListComponent } from './components/measurementUnit-list/measurementUnit-list.component';
import { MeasurementUnitListResolver } from './resolvers/measurementUnit-list-resolver';

import { ShippingTypeListComponent } from './components/shippingType-list/shippingType-list.component';
import { ShippingTypeListResolver } from './resolvers/shippingType-list-resolver';

const routes: Routes = [

  {
    path: '',
    redirectTo: '/hea',
    pathMatch: 'full'
  },
  {
    path: 'hea',
    component: NavComponent,
    children: [
      { path: '', component: AboutComponent, outlet: 'mainContent' },
      { path: 'about', component: AboutComponent, outlet: 'mainContent' },
      { path: 'labels', component: LabelListComponent, outlet: 'mainContent', resolve: { labels: LabelListResolver } },
      { path: 'weightUnits', component: WeightUnitListComponent, outlet: 'mainContent', resolve: { weightUnits: WeightUnitListResolver } },
      { path: 'measurementUnits', component: MeasurementUnitListComponent, outlet: 'mainContent', resolve: { measurementUnits: MeasurementUnitListResolver } },
      { path: 'shippingTypes', component: ShippingTypeListComponent, outlet: 'mainContent', resolve: { shippingTypes: ShippingTypeListResolver } }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
