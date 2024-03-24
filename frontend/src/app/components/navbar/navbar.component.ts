import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import { loginStatus } from '../../guards/login.guard';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
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
  trashIcon = faTrash;

  loginStatus = loginStatus()
  rol = localStorage.getItem('rol')

  cartStatus = false

  @ViewChild('nav') nav!: ElementRef;
  @ViewChild('searchIcon') searchIcon!: ElementRef;

  constructor(private router: Router) {
    
  }

  ngAfterViewInit(): void {
      let l = document.querySelectorAll(`[url="${this.router.url}"]`)[0].classList.add('currentPage');
  }

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

  logOut() {
    this.loginStatus = false
    this.rol = ''
    localStorage.removeItem('token')
    localStorage.removeItem('rol')
    this.router.navigate([''])
  }
}
