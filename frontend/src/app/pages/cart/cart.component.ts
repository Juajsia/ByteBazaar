import { Component, HostListener } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterLink } from '@angular/router';
import {
  faCartShopping,
  faBagShopping,
  faTrash,
  faPlus,
  faMinus
} from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../services/cart.service';
import { Cart, CartProduct } from '../../interfaces/cart';
import { Product } from '../../interfaces/product';
import { CartProductService } from '../../services/cart-product.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { switchAll, switchMap } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { Order } from '../../interfaces/order';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent, FontAwesomeModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartIcon = faCartShopping
  bagIcon = faBagShopping
  trashIcon = faTrash
  plusIcon = faPlus
  minusIcon = faMinus

  cartId = Number(localStorage.getItem('cart'))
  cartItems: Product[] = []
  summary = {
    totProds: 0,
    adCosts: 0
  }
  changes = false
  changeditems = new Set()

  constructor(private _cartService: CartService, private _cartProductService: CartProductService, private _orderService: OrderService, private router: Router) {

  }

  ngOnInit() {
    this.getItems()
  }

  ngOnDestroy() {
    if (this.changes) {
      this.updateItems()
    }
  }

  getItems() {
    this._cartService.getCartItems(this.cartId).subscribe((res: Cart) => {
      const { Products } = res
      this.cartItems = Products as Product[]
      this.cartItems?.map(prod => {
        if (prod.status) {
          this.summary.totProds += prod.price
        }
      })
    })
  }

  deleteItem(prodId: number) {
    const cartProduct: CartProduct = {
      CartId: this.cartId,
      ProductId: prodId
    }

    this._cartProductService.deleteCartItem(cartProduct).subscribe({
      next: async () => {
        await Swal.fire({
          icon: "success",
          title: "Product deleted sucessfully",
          text: `Product was deleted from your cart!!`,
          showConfirmButton: false,
          timer: 1500
        });
        window.location.reload()
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
            title: "Error deleting product from cart",
            text: `Item could not be deleted from your cart, try again later`,
            showConfirmButton: false,
            timer: 2000
          });
        }
      }
    }
    )
  }

  updateItems() {
    this.changeditems.forEach(itemIndex => {
      const cartProduct: CartProduct = {
        CartId: this.cartId,
        ProductId: this.cartItems[Number(itemIndex)].id!,
        quantity: this.cartItems[Number(itemIndex)].CartProduct!.quantity
      }

      this._cartProductService.updateCartItem(cartProduct).subscribe({
        next: () => {

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
              title: "Error updating product",
              text: `Item could not be updated, try again later`,
              showConfirmButton: false,
              timer: 2000
            });
          }
        }
      })

    })
  }

  buyProduct(prodIndex: number) {
    this.createOrder([this.cartItems[prodIndex]])
  }

  checkout() {
    let error = false
    let i = 0
    while (i < this.cartItems.length && !error) {
      if (this.cartItems[i].stock === 0) {
        Swal.fire({
          icon: "error",
          title: `Product ${this.cartItems[i].name} does not have stock`,
          text: `Please delete it from your cart you want to checkout`,
          showConfirmButton: false,
          timer: 4000
        });
        error = true
      }
      if (!this.cartItems[i].status) {
        Swal.fire({
          icon: "error",
          title: `Product ${this.cartItems[i].name} is not available`,
          text: `Please delete it from your cart you want to checkout`,
          showConfirmButton: false,
          timer: 4000
        });
        error = true
      }
      i++
    }
    if (!error)
      this.createOrder(this.cartItems)
  }

  createOrder(products: Product[]) {
    const order: Order = {
      clientId: Number(localStorage.getItem('cid')),
      Products: products
    }
    this._orderService.createOrder(order).subscribe({
      next: () => {
        Swal.fire({
          icon: "success",
          title: "Order created sucessfully",
          text: `Successful purchase`,
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
          }).then((result) => {
            if (result.isConfirmed) {
              this.downloadPdf(2)
              Swal.fire("Saved!", "", "success");
            }
            if (products.length > 1) {
              this._cartProductService.clearCartItem(this.cartId).subscribe(() => {
                this.router.navigate(['/'])
              })
            } else {
              const cartProduct: CartProduct = {
                CartId: this.cartId,
                ProductId: products[0].id!
              }
              this._cartProductService.deleteCartItem(cartProduct).subscribe({
                next: () => {
                  // window.location.reload()
                }, error: (e: HttpErrorResponse) => {
                  console.log("Error deleting product after purchase")
                }
              }
              )
            }
          });
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

  modifyQuantity(prodId: number, prodStock: number, op: boolean, itemIndex: number) {
    const minusBtn = document.getElementById(`minusBtn-${prodId}`)!
    const plusBtn = document.getElementById(`plusBtn-${prodId}`)!
    const quantityTag = document.getElementById(`quantityVal-${prodId}`)!
    let quantity = Number(quantityTag?.textContent)

    if (op) {
      minusBtn?.classList.remove('disabled')
      if (quantity !== prodStock) {
        if (quantity + 1 === prodStock)
          plusBtn.classList.add('disabled')
        else
          plusBtn.classList.remove('disabled')
        quantity++
        this.summary.totProds += this.cartItems[itemIndex].price
      }
    } else {
      plusBtn?.classList.remove('disabled')
      if (quantity !== 1) {
        if (quantity - 1 === 1)
          minusBtn.classList.add('disabled')
        else
          minusBtn.classList.remove('disabled')
        quantity--
        this.summary.totProds -= this.cartItems[itemIndex].price
      }
    }
    quantityTag.textContent = String(quantity)
    this.cartItems[itemIndex].CartProduct!.quantity = quantity
    this.changes = true
    this.changeditems.add(itemIndex)
  }

  getQuantity(prodId: number) {
    return Number(document.getElementById(`quantityVal-${prodId}`)?.textContent)
  }

  goToProduct(prodName: string) {
    this.router.navigate([`/product/${prodName}`])
  }

  downloadPdf(id: number): void {
    this._orderService.generatePdf(id).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Factura${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Error downloading the PDF', error);
    });
  }
}
