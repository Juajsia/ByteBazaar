import { Component } from '@angular/core';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterLink } from '@angular/router';
import { CartProductService } from '../../services/cart-product.service';
import { Product } from '../../interfaces/product';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../interfaces/category';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, NavbarComponent, FontAwesomeModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  arrow = faChevronRight
  
  bestSellers: Product[] = []
  prodsByCat1: Product[] = []
  prodsByCat2: Product[] = []
  prodsByCat3: Product[] = []
  Cat1 = {} as Category
  Cat2 = {} as Category
  Cat3 = {} as Category
  catsNames: string[] = ['Computer', 'Smartphone', 'Tablet']

  constructor(private _cartProductService: CartProductService, private _productService: ProductService, private _categoryService: CategoryService, private router: Router) {
  }
  
  ngOnInit() {
    this.getBestSellers()
    for (let i=0; i < 3; i++){
      this.getProdsByCat(this.catsNames[i], i)
    }

  }

  getBestSellers () {
    this._cartProductService.getBestSellers().subscribe({
      next: (res: Product[]) => {
        const firstOnes = res.slice(0,6)
        firstOnes.sort((a, b) => parseInt(b.ordersnum!) - parseInt(a.ordersnum!))
        firstOnes.forEach(item=>{
          this._productService.getProduct(item.name).subscribe((res: Product) => {
            item.categories = res.categories.filter(v => {
              if (["Computer", "Smartphone", "Tablet"].includes(v))
                return false
              else
                return true
            })
            item.categories = item.categories.slice(0,1)
          })
        })
        this.bestSellers = firstOnes

      }, error: (e: HttpErrorResponse) => {
        console.log('error fetching best sellers')
      }
    })
  }

  getProdsByCat(name: string, num: number) {
    this._categoryService.getCategoryByName(name).subscribe((data) => {
      let { Products, ...otherProperties } = data
      Products = Products.slice(0,6)
      Products.forEach((item: Product) => {
        this._productService.getProduct(item.name).subscribe((res: Product) => {
          item.categories = res.categories.filter(v => {
            if (["Computer", "Smartphone", "Tablet"].includes(v))
              return false
            else
              return true
          });
          item.categories = item.categories.slice(0,1)
        });
      });

      switch (num) {
        case 0:
          this.prodsByCat1 = Products
          this.Cat1 = otherProperties
          break;
        case 1:
          this.prodsByCat2 = Products
          this.Cat2 = otherProperties
          break;
        case 2:
          this.prodsByCat3 = Products
          this.Cat3 = otherProperties
          break;
        default:
          console.log(`category number is wrong`);
      }

    })
  }

  openCategory(catId: number) {
    this.router.navigate([`products/${catId}`])
  }

  openProduct(prodName: string) {
    this.router.navigate([`product/${prodName}`])
  }
}

