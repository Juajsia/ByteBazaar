import { Component } from '@angular/core';
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

  constructor(private _cartService: CartService, private _cartProductService: CartProductService, private router: Router) {

  }

  ngOnInit() {
    this.getItems()
  }

  getItems() {
      this._cartService.getCartItems(this.cartId).subscribe((res: Cart) => {
        const {Products} = res
        this.cartItems = Products as Product[]
        this.cartItems?.map(prod=>{
          this.summary.totProds += prod.price
        })
    })
  }

  deleteItem(prodId: number) {
    const cartProduct: CartProduct = {
      CartId: this.cartId,
      ProductId: prodId
    }

    this._cartProductService.deleteCartItem(cartProduct).subscribe({
      next: async ()=>{
        await Swal.fire({
          icon: "success",
          title: "Product deleted sucessfully",
          text: `Product was deleted from your cart!!`,
          showConfirmButton: false,
          timer: 1500
        });
        window.location.reload()  
      }, error: (e: HttpErrorResponse)=>{
        Swal.fire({
          icon: "error",
          title: "Error deleting product from cart",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
    )
  }

  modifyQuantity(prodId: number, prodStock: number, op: boolean){
    const minusBtn = document.getElementById(`minusBtn-${prodId}`)!
    const plusBtn = document.getElementById(`plusBtn-${prodId}`)!
    const quantityTag = document.getElementById(`quantityVal-${prodId}`)!
    let quantity = Number(quantityTag?.textContent)

    if (op){
      minusBtn?.classList.remove('disabled')
      if (quantity !== prodStock){
        if (quantity + 1 === prodStock)
          plusBtn.classList.add('disabled')
        else
          plusBtn.classList.remove('disabled')
        quantity++
      }
    } else {
      plusBtn?.classList.remove('disabled')
      if (quantity !== 1){
        if (quantity - 1 === 1)
          minusBtn.classList.add('disabled')
        else
          minusBtn.classList.remove('disabled')
        quantity--
      }
    }
    quantityTag.textContent = String(quantity)
  }

  getQuantity(prodId: number) {
    return Number(document.getElementById(`quantityVal-${prodId}`)?.textContent)
  }

  goToProduct(prodName: string) {
    this.router.navigate([`/product/${prodName}`])
  }
}
