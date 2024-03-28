import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faCartShopping, 
  faBagShopping, 
  faDesktop,
  faMobileScreenButton,
  faTabletScreenButton,
  faTrash,
  faPenToSquare
} from '@fortawesome/free-solid-svg-icons';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { ProductFormComponent } from '../../components/product-form/product-form.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NavbarComponent, RouterLink, FontAwesomeModule, ProductFormComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  cart = faCartShopping
  bag = faBagShopping
  pc = faDesktop
  phone = faMobileScreenButton
  tablet = faTabletScreenButton
  trashIcon = faTrash
  editIcon = faPenToSquare

  role = localStorage.getItem('rol')
  showForm = false

  constructor (private _productService: ProductService, private router: Router) {
  }

  ngOnInit() {
    const regex = new RegExp('\/product\/edit')
    if (regex.test(this.router.url))
      this.showForm = true
    else
      this.showForm = false
  }

  editProduct() {
    const productName = document.getElementById('productName')?.textContent
    this.router.navigate([`/product/edit/${productName}`])
  }

  deleteProduct() {
    const productName = document.getElementById('productName')?.textContent!
    this._productService.deleteProduct(productName).subscribe(()=>{
      alert('Product deleted')
      this.router.navigate(['/'])
    })
  }
}
