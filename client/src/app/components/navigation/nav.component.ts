import { Component, ViewChild } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
    selector: 'nav',
    templateUrl: 'nav.component.html',
    styleUrls: ['nav.component.scss'],
})

export class NavComponent {

    @ViewChild('sidenav') sidenav: MatSidenav;

    isExpanded = true;
    showSubmenu: boolean = false;
    isShowing = false;
    showSubSubMenu: boolean = false;

    mouseenter() {
        if (!this.isExpanded) {
            this.isShowing = true;
        }
    }

    mouseleave() {
        if (!this.isExpanded) {
            this.isShowing = false;
        }
    }
}
