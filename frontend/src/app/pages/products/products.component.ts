import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { CategoryService } from '../../services/category.service';
import { Product } from '../../interfaces/product';
import { Category } from '../../interfaces/category';
import { ProductService } from '../../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { OrderDetailsService } from '../../services/order-details.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NavbarComponent, RouterLink, FontAwesomeModule, ProductFormComponent, FormsModule],
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
  catId = 0
  productsList: Product[] = []
  copyProductsList: Product[] = []
  prodCatsList: string[] = []
  copyProdCatsList: string[] = []
  category = {} as Category

  isChecked: boolean = false;
  price: number = 0
  maxPrice: number = 0
  canAdd: boolean = true

  constructor(private _categoryService: CategoryService, private _productService: ProductService, private _orderDetailsService: OrderDetailsService, private router: Router, private aRouter: ActivatedRoute) {
    this.catId = Number(this.aRouter.snapshot.paramMap.get('catId')!)
  }

  ngOnInit() {
    if (this.router.url === `/products/${this.catId}/add`)
      this.showForm = true
    else {
      this.showForm = false
      if (this.router.url === `/products/bestSellers`) {
        this.getBestSellers()
        this.canAdd = false
        this.category.name = 'Best Sellers'
        this.category.description = `These are our user's favorites applications`
      }
      else
        this.getProdsByCat()
    }

  }

  getProdsByCat() {
    return this._categoryService.getCategory(this.catId).subscribe((data) => {
      const { Products, ...otherProperties } = data
      this.category = otherProperties
      this.productsList = Products
      this.getProductsCategories()
      this.copyProductsList = this.productsList.slice()
      this.higherPrice()
    })
  }

  getProductsCategories() {
    this.prodCatsList = []
    this.copyProdCatsList = []
    this.productsList.forEach(item => {
      this._productService.getProduct(item.name).subscribe((res: Product) => {
        const catsFiltered = res.categories.filter(v => {
          return !["Computer", "Smartphone", "Tablet"].includes(v);
        });
        let concat = catsFiltered.slice(0, 2).join(' | ')
        this.prodCatsList.push(concat)
        this.copyProdCatsList.push(concat)
      })
    })
  }

  getBestSellers() {
    this._orderDetailsService.getBestSellers(false).subscribe({
      next: (res: Product[]) => {
        this.productsList = res
        this.getProductsCategories()
        this.copyProductsList = this.productsList.slice()
        this.higherPrice()
      }, error: (e: HttpErrorResponse) => {
        console.log('error fetching best sellers')
      }
    })
  }

  addProduct() {
    this.router.navigate([`/products/${this.catId}/add`])
  }

  showProduct(prodName: any) {
    this.router.navigate([`/product/${prodName}`])
  }

  switchInstockCheck() {
    if (this.isChecked) {
      this.filterProductsFromStock()
    } else {
      this.productsList = [...this.copyProductsList]
      this.prodCatsList = [...this.copyProdCatsList]
    }
  }

  filterProductsFromStock() {
    let i = 0
    const productsInStock: Product[] = []
    const productCatsInStock: string[] = []
    while (i < this.productsList.length) {
      if (this.productsList[i].stock != 0) {
        productsInStock.push(this.productsList[i])
        productCatsInStock.push(this.prodCatsList[i])
      }
      i++
    }
    this.productsList = productsInStock
    this.prodCatsList = productCatsInStock
  }

  sortByLowerPrice() {
    this.productsList.sort((a, b) => a.price - b.price)
    this.getProductsCategories()
  }

  sortByHigherPrice() {
    this.productsList.sort((a, b) => b.price - a.price)
    this.getProductsCategories()
  }

  sortByNameAz() {
    this.productsList.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
    this.getProductsCategories()
  }

  sortByNameZa() {
    this.productsList.sort((a, b) => {
      return b.name.localeCompare(a.name)
    })
    this.getProductsCategories()
  }

  higherPrice() {
    let higher = this.productsList.reduce((maxPrice, product) => {
      return Math.max(maxPrice, product.price);
    }, -Infinity);
    this.maxPrice = higher + 1
    this.price = this.maxPrice - 1
  }

  pricefilter() {
    this.productsList = [...this.copyProductsList]
    let productsfiltered = this.productsList.filter(product => product.price <= this.price)
    this.productsList = [...productsfiltered]
    this.getProductsCategories()
  }

}
