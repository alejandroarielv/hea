import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavComponent } from './components/navigation/nav.component';

import { AboutComponent } from './components/about/about.component';
import { LabelListComponent } from './components/label-list/label-list.component';
import { LabelListResolver } from './resolvers/label-list-resolver';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandListResolver } from './resolvers/brand-list-resolver';
import { MeasurementUnitListComponent } from './components/measurementUnit-list/measurementUnit-list.component';
import { MeasurementUnitListResolver } from './resolvers/measurementUnit-list-resolver';
import { ShippingTypeListComponent } from './components/shippingType-list/shippingType-list.component';
import { ShippingTypeListResolver } from './resolvers/shippingType-list-resolver';
import { ProductAttributeListComponent } from './components/productAttribute-list/productAttribute-list.component';
import { ProductAttributeListResolver } from './resolvers/productAttribute-list-resolver';
import { ProductListComponent } from './components/product-list/product-list.component';


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
      { path: 'brands', component: BrandListComponent, outlet: 'mainContent', resolve: { brands: BrandListResolver } },
      { path: 'measurementUnits', component: MeasurementUnitListComponent, outlet: 'mainContent', resolve: { measurementUnits: MeasurementUnitListResolver } },
      { path: 'shippingTypes', component: ShippingTypeListComponent, outlet: 'mainContent', resolve: { shippingTypes: ShippingTypeListResolver } },
      { path: 'productAttributes', component: ProductAttributeListComponent, outlet: 'mainContent', resolve: { productAttributes: ProductAttributeListResolver } },
      
      { path: 'products', component: ProductListComponent, outlet: 'mainContent' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
