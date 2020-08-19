import { Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { INavItem } from './INavItem';
import { NavService } from './nav.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NavigationComponent implements AfterViewInit {

  @ViewChild('appDrawer') appDrawer: ElementRef;

  navItems: INavItem[] = [
    {
      displayName: 'Parametrics',
      iconName: 'group',
      route: 'parametrics',
      children: [
        {
          displayName: 'Labels',
          iconName: 'group',
          route: 'parametrics/labels',
        },
        {
          displayName: 'Weight Units',
          iconName: 'group',
          route: 'parametrics/weightUnits',
        },
        {
          displayName: 'Measurement Units',
          iconName: 'group',
          route: 'parametrics/measurementUnits',
        },
        {
          displayName: 'Shipping Types',
          iconName: 'group',
          route: 'parametrics/shippingTypes',
        }
      ]
    }];

  constructor(private navService: NavService) {
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

}
