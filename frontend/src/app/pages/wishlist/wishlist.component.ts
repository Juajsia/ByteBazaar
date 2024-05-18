import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterLink } from '@angular/router';
import {
  faCartShopping,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { CartProduct } from '../../interfaces/cart';
import { Product } from '../../interfaces/product';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { WishlistService } from '../../services/wishlist.service';
import { WishlistProductService } from '../../services/wishlist-product.service';
import { Wishlist, WishlistProduct } from '../../interfaces/wishlist';
import { CartProductService } from '../../services/cart-product.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [NavbarComponent, FontAwesomeModule, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  cartIcon = faCartShopping
  trashIcon = faTrash

  cartId = Number(localStorage.getItem('cart'))
  items: Product[] = []
  changes = false
  changeditems = new Set()

  constructor(private _wishlistService: WishlistService, private _wishProductService: WishlistProductService, private _cartProductService: CartProductService, private router: Router) {

  }

  ngOnInit() {
    this.getItems()
  }

  getItems() {
    this._wishlistService.getWishlistItems(this.cartId).subscribe((res: Wishlist) => {
      const { Products } = res
      this.items = Products as Product[]
    })
  }

  deleteItem(prodId: number) {
    const wishlistProduct: WishlistProduct = {
      WishlistId: this.cartId,
      ProductId: prodId
    }

    this._wishProductService.deleteWishlistItem(wishlistProduct).subscribe({
      next: async () => {
        await Swal.fire({
          icon: "success",
          title: "Product deleted sucessfully",
          text: `Product was deleted from your wishlist!!`,
          showConfirmButton: false,
          timer: 1500
        });
        window.location.reload()
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
            title: "Error deleting product from wishlist",
            text: `Item could not be deleted from your cart, try again later`,
            showConfirmButton: false,
            timer: 2000
          });
        }
      }
    })
  }

  addToCart(product: Product) {
    const cartProduct: CartProduct = {
      CartId: Number(localStorage.getItem('cart')),
      ProductId: product.id!,
      quantity: 1
    }

    this._cartProductService.addCartItem(cartProduct).subscribe({
      next: () => {
        Swal.fire({
          icon: "success",
          title: "Product added sucessfully",
          text: `Product ${product.name} added to your cart!!`,
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          const wishlistProduct: WishlistProduct = {
            WishlistId: this.cartId,
            ProductId: product.id!
          }
          this._wishProductService.deleteWishlistItem(wishlistProduct).subscribe({
            next: async () => {
              window.location.reload()
            }
          })
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

  goToProduct(prodName: string) {
    this.router.navigate([`/product/${prodName}`])
  }
}
