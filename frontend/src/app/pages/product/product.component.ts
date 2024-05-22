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
  faEyeSlash,
  faHeart
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartNoBG } from '@fortawesome/free-regular-svg-icons';
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
import { Order } from '../../interfaces/order';
import { OrderService } from '../../services/order.service';
import { WishlistProductService } from '../../services/wishlist-product.service';
import { WishlistProduct } from '../../interfaces/wishlist';
import { Observable, lastValueFrom } from 'rxjs';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { OrderDetailsService } from '../../services/order-details.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


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
  favIcon = faHeart
  favIconNoBG = faHeartNoBG

  role = localStorage.getItem('rol')
  showForm = false
  newSpecRegex = /^-.*/
  product = {} as Product
  productName = ''
  productSpecs: string[] = []
  productCats: string[] = []
  productPlats: string[] = []
  allCategories: Category[] = []
  addToWishlistIcon = this.favIconNoBG
  inWishlist = false
  wishlistId = Number(localStorage.getItem('wishlist'))

  constructor(private _productService: ProductService, private _categoryService: CategoryService, private _cartProductService: CartProductService, private _orderService: OrderService, private _wishlistProductService: WishlistProductService, private router: Router, private aRouter: ActivatedRoute) {
    this.productName = this.aRouter.snapshot.paramMap.get('name')!
  }

  async ngOnInit() {
    this.getProduct()
    this.getCategories()
    const regex = new RegExp('\/product\/.*\/edit')
    if (regex.test(this.router.url))
      this.showForm = true
    else
      this.showForm = false
  }

  getProduct() {
    this._productService.getProduct(this.productName).subscribe(async (res: Product) => {
      this.product = res
      this.productCats = res.categories.filter(v => {
        if (["Computer", "Smartphone", "Tablet"].includes(v)) {
          this.productPlats.push(v)
          return false
        } else
          return true
      })

      this.productSpecs = res.specs.split('\n')
      if (localStorage.getItem('token'))
        this.addToWishlistIcon = await lastValueFrom(this.isInWishlist())
    })
  }

  getCategories() {
    this._categoryService.getAllCategory().subscribe((data) => {
      this.allCategories = data
    })
  }

  buyProduct() {
    const order: Order = {
      clientId: localStorage.getItem('cid')!,
      Products: [{ ...this.product, quantity: 1 }],
      total: this.product.price
    }

    this._orderService.createOrder(order).subscribe({
      next: () => {
        this.product.stock--
        Swal.fire({
          icon: "success",
          title: "Order created sucessfully",
          text: `Successful purchase`,
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          Swal.fire({
            title: "Do you want to download your invoice in PDf?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "save",
            denyButtonText: `Don't save`
          }).then((result) => {
            if (result.isConfirmed) {
              this.createpdf()
              Swal.fire("Saved!", "", "success");
            }
          })
        })
      }, error: (e: HttpErrorResponse) => {
        if (e.error.forUser) {
          Swal.fire({
            icon: "error",
            title: e.error.message,
            text: e.error.text,
            showConfirmButton: false,
            timer: 4000
          });
        } else {
          Swal.fire({
            icon: "error",
            title: `Error creating order`,
            text: `something wrong happended, purchase was not completed, try again later`,
            showConfirmButton: false,
            timer: 4000
          });
        }
      }
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
          text: `Product ${this.product.name} was added to your cart!!`,
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.reload()
        });
      }, error: (e: HttpErrorResponse) => {
        if (e.error.forUser) {
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
            if (e.error.forUser) {
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

  isInWishlist(): Observable<any> {
    return new Observable<any>((observer) => {
      this._wishlistProductService.checkWishlistItemExistence(this.wishlistId, this.product.id!).subscribe({
        next: (res) => {
          if (!res.message) {
            observer.next(this.favIcon);
            observer.complete();
          } else {
            observer.next(this.favIconNoBG);
            observer.complete();
          }
        }, error: (error) => {
          observer.error(error);
        }
      });
    });
  }

  addToWishlist() {
    const wishlistProduct: WishlistProduct = {
      WishlistId: Number(localStorage.getItem('cart')),
      ProductId: this.product.id!,
    }
    if (this.addToWishlistIcon === this.favIconNoBG) {
      this._wishlistProductService.addWishlistItem(wishlistProduct).subscribe({
        next: () => {
          this.addToWishlistIcon = this.favIcon
        }, error: (e: HttpErrorResponse) => {
          if (e.error.forUser) {
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
              title: "Error Adding product to your wishlist",
              text: "Product could not be added to your wishlist, try again later",
              showConfirmButton: false,
              timer: 2000
            });
          }
        }
      })
    } else {
      this._wishlistProductService.deleteWishlistItem(wishlistProduct).subscribe({
        next: () => {
          this.addToWishlistIcon = this.favIconNoBG
        }, error: (e: HttpErrorResponse) => {
          if (e.error.forUser) {
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
              title: "Error deleting product to your wishlist",
              text: "Product could not be deleted from your wishlist, try again later",
              showConfirmButton: false,
              timer: 2000
            });
          }
        }
      })
    }
  }

  createpdf() {
    let body = [[
      'Product',
      'Quantity',
      'Price (USD)',
    ]]

    body.push([this.product.name, '1', String(this.product.price)])
    const pdfDefinition: any = {
      content: [
        { text: 'Purchase Bill', style: 'header' },
        `Company Information:

        Company Name: ByteBazaar
        Address: Cra. 48 #7 151, El Poblado, Medellin
        Telephone: +57 314535114
        Email: contacto@bytebazaar.com
        
        `,
        {
          table: {
            widths: ['*', 200, 'auto'],
            body
          }
        }, { text: `Total : ${this.product.price} USD`, style: 'subheader' },
        `Terms and Conditions:

        Payment must be made within 15 days from the date of issue.
        Returns of software licenses once activated are not accepted.
        For technical support, contact support@bytebazaar.com.
        Additional notes:
        
        Thank you for your purchase at ByteBazaar.
If you have any questions or need additional assistance, please do not hesitate to contact us.`
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableheader: {
          bold: true
        }
      }
    }

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }
}
