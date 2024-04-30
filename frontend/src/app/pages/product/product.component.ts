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
  faPenToSquare,
  faCircleCheck,
  faEyeSlash
} from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/category.service';
import { CartProductService } from '../../services/cart-product.service';
import { CartProduct } from '../../interfaces/cart';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

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
  enableIcon = faCircleCheck
  desableIcon = faEyeSlash

  role = localStorage.getItem('rol')
  showForm = false
  newSpecRegex = /^-.*/
  product = {} as Product
  productName = ''
  productSpecs: string[] = []
  productCats: string[] = []
  productPlats: string[] = []
  allCategories: Category[] = []

  constructor(private _productService: ProductService, private _categoryService: CategoryService, private _cartProductService: CartProductService, private router: Router, private aRouter: ActivatedRoute) {
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

  addToCart() {
    const cartProduct: CartProduct = {
      CartId: Number(localStorage.getItem('cart')),
      ProductId: this.product.id!,
      quantity: 1
    }

    this._cartProductService.addCartItem(cartProduct).subscribe({
      next: () => {
        Swal.fire({
          icon: "success",
          title: "Product added sucessfully",
          text: `Product ${this.product.name} added!!`,
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.reload()
        });
      }, error: (e: HttpErrorResponse) => {
        if(e.error.forUser){
          Swal.fire({
            icon: "info",
            title: e.error.message,
            text: e.error.text,
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error Adding product to your cart",
            text: "Product could not be added to your cart, try again later",
            showConfirmButton: false,
            timer: 2000
          });
        }
      }
    })
  }

  editProduct() {
    this.router.navigate([`/product/${this.productName}/edit`])
  }

  desableProduct() {
    const productName = document.getElementById('productName')?.textContent!
    this._productService.desableProduct(productName).subscribe({
      next: () => {
        Swal.fire({
          icon: "success",
          title: "Product desabled sucessfully",
          text: `Product ${this.product.name} was desabled!!`,
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/'])
      },
      error: (e: HttpErrorResponse) => {
        Swal.fire({
          icon: "error",
          title: "Error disabling product",
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }

  enableProduct() {
    const productName = document.getElementById('productName')?.textContent!
    this._productService.enableProduct(productName).subscribe({
      next: () => {
        Swal.fire({
          icon: "success",
          title: "Product enabled sucessfully",
          text: `Product ${this.product.name} enabled!!`,
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/'])
      },
      error: (e: HttpErrorResponse) => {
        Swal.fire({
          icon: "error",
          title: "Error enabling product",
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }

  deleteProduct() {
    Swal.fire({
      title: "Are you sure to remove the product?",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        this._productService.deleteProduct(this.product.id!).subscribe({
          next: () => {
            Swal.fire("Product Deleted!", "", "success");
            this.router.navigate(['/'])
          },
          error: (e: HttpErrorResponse) => {
            if(e.error.forUser){
              Swal.fire({
                icon: "error",
                title: e.error.message,
                text: e.error.text,
                showConfirmButton: false,
                timer: 2000
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Error Deleting product",
                text: "product could not be deleted, try again later",
                showConfirmButton: false,
                timer: 1500
              });
            }
          }
        })
      }
    });
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
