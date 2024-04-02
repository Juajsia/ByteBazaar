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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/category.service';

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
  newSpecRegex = /^-.*/
  product = {} as Product
  productName = ''
  productSpecs: string[] = []
  productCats: string[] = []
  productPlats: string[] = []
  allCategories: Category[] = []

  constructor(private _productService: ProductService, private _categoryService: CategoryService, private router: Router, private aRouter: ActivatedRoute) {
    this.productName = this.aRouter.snapshot.paramMap.get('name')!
  }

  ngOnInit() {
    this.getProduct()
    this.getCategories()
    const regex = new RegExp('\/product\/.*\/edit')
    if (regex.test(this.router.url))
      this.showForm = true
    else
      this.showForm = false
  }

  getProduct() {
    this._productService.getProduct(this.productName).subscribe((res: Product) => {
      this.product = res
      this.productCats = res.categories.filter(v => {
        if (["Computer", "Smartphone", "Tablet"].includes(v)) {
          this.productPlats.push(v)
          return false
        } else
          return true
      })

      this.productSpecs = res.specs.split('\n')
    })
  }

  getCategories() {
    this._categoryService.getAllCategory().subscribe((data) => {
      this.allCategories = data
    })
  }

  editProduct() {
    this.router.navigate([`/product/${this.productName}/edit`])
  }

  deleteProduct() {
    const productName = document.getElementById('productName')?.textContent!
    this._productService.deleteProduct(productName).subscribe(() => {
      alert('Product deleted')
      this.router.navigate(['/'])
    })
  }

  showCategory(catName: string) {
    let catId = 0
    let f = false
    let i = 0
    while (i < this.allCategories.length && f === false) {
      if (this.allCategories[i].name === catName) {
        catId = this.allCategories[i].id!
        f = true
      }
      i++
    }
    this.router.navigate([`products/${catId}`])
  }
}
