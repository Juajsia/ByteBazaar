import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterLink } from '@angular/router';
import { ProductFormComponent } from '../../components/product-form/product-form.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NavbarComponent, RouterLink, FontAwesomeModule, ProductFormComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  filterCaret = faCaretDown
  addIcon = faPlus
  rol = localStorage.getItem('rol')
  photoshopImg = 'https://w7.pngwing.com/pngs/301/722/png-transparent-adobe-logo-logos-photoshop-logos-and-brands-icon-thumbnail.png'
  role = localStorage.getItem('rol')
  showForm = false

  constructor(private router: Router){

  }

  ngOnInit() {
    if (this.router.url === '/products/add')
      this.showForm = true
    else
      this.showForm = false
  }

  addProduct() {
    this.router.navigate([`/products/add`])
  }
}
