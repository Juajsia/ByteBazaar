import { Component, ElementRef, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBars,
  faSearch,
  faX,
  faCartShopping,
  faHome,
  faLayerGroup,
  faUserGroup,
  faComments,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  barsIcon = faBars;
  loupeIcon = faSearch;
  xIcon = faX;
  cartIcon = faCartShopping;
  homeicon = faHome;
  catIcon = faLayerGroup;
  aboutIcon = faUserGroup;
  chatIcon = faComments;

  @ViewChild('nav') nav!: ElementRef;
  @ViewChild('searchIcon') searchIcon!: ElementRef;

  toggleSearch() {
    this.nav.nativeElement.classList.toggle('openSearch');
    this.nav.nativeElement.classList.remove('openNav');
  }

  openNav() {
    this.nav.nativeElement.classList.add('openNav');
    this.nav.nativeElement.classList.remove('openSearch');
    this.searchIcon.nativeElement.classList.replace('uil-times', 'uil-search');
  }

  closeNav() {
    this.nav.nativeElement.classList.remove('openNav');
  }
}
