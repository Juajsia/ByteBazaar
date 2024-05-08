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
  faTrash,
  faHeadset,
  faRotateRight
} from '@fortawesome/free-solid-svg-icons';
import { loginStatus } from '../../guards/login.guard';
import { ChatboxComponent } from '../chatbox/chatbox.component';
import { Product } from '../../interfaces/product';
import { CartService } from '../../services/cart.service';
import { CartProductService } from '../../services/cart-product.service';
import { Cart, CartProduct } from '../../interfaces/cart';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, ChatboxComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  barsIcon = faBars
  loupeIcon = faSearch
  xIcon = faX
  cartIcon = faCartShopping
  homeicon = faHome
  catIcon = faLayerGroup
  aboutIcon = faUserGroup
  chatIcon = faComments
  trashIcon = faTrash
  bubbleIcon = faHeadset
  refreshIcon = faRotateRight

  loginStatus = loginStatus()
  rol = localStorage.getItem('rol')

  cartStatus = false
  cartId = Number(localStorage.getItem('cart'))
  cartItems: Product[] = []
  subtotal: number = 0

  cartItemsCount = 0

  @ViewChild('nav') nav!: ElementRef;
  @ViewChild('searchIcon') searchIcon!: ElementRef;

  constructor(private _cartService: CartService, private _cartProductService: CartProductService, private router: Router) {

  }


  ngOnInit() {
    if (this.rol === 'client') {
      this.getCartItems()
    }
  }

  ngAfterViewInit(): void {
    const icon = document.querySelector(`[url="${this.router.url}"]`)
    if (icon)
      icon.classList.add('currentPage')
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

  switchCartStatus() {
    this.cartStatus = !this.cartStatus
  }

  disableCartButton() {
    return this.router.url === '/cart'
  }

  async logOut() {
    this.loginStatus = false
    this.rol = ''
    localStorage.removeItem('token')
    localStorage.removeItem('rol')
    localStorage.removeItem('cart')
    localStorage.removeItem('cid')
    localStorage.setItem('logout','yes')
    await Swal.fire({
      icon: "success",
      title: "Successful logout",
      showConfirmButton: false,
      timer: 1500
    });
    this.router.navigate([''])
  }

  getCartItems() {
    this._cartService.getCartItems(this.cartId).subscribe((res: Cart) => {
      const { Products } = res
      this.cartItems = Products as Product[]
      this.subtotal = 0
      this.cartItemsCount = this.cartItems.length
      this.cartItems?.map(prod => {
        if (prod.status) {
          this.subtotal += prod.price
        }
      })
    })
  }

  goToProduct(prodName: string) {
    this.router.navigate([`/product/${prodName}`])
  }

  deleteItem(prodId: number) {
    const cartProduct: CartProduct = {
      CartId: this.cartId,
      ProductId: prodId
    }

    this._cartProductService.deleteCartItem(cartProduct).subscribe({
      next: () => {
        Swal.fire({
          icon: "success",
          title: "Product deleted sucessfully",
          text: `Product was deleted from your cart!!`,
          showConfirmButton: false,
          timer: 1500
        });
        this.cartItems = this.cartItems.filter(x => {
          if (x.id !== cartProduct.ProductId)
            return true
          this.subtotal -= x.price
          this.subtotal = Number(this.subtotal.toFixed(2))
          return false
        })
        this.cartItemsCount = this.cartItems.length
      }, error: (e: HttpErrorResponse) => {
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
}
// 