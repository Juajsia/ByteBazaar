import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { OrderService } from '../../services/order.service';
import { Order } from '../../interfaces/order';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {
  orders: Array<Order> = []
  constructor(private _orderService: OrderService, private router: Router) {
  }
  ngOnInit() {
    this.getClientHistory()
  }

  goToProduct(prodName: string) {
    this.router.navigate([`/product/${prodName}`])
  }
  getClientHistory() {
    this._orderService.getClientHistory(localStorage.getItem('cid')).subscribe({
      next: (data) => {
        this.orders = data
      }, error: (e: HttpErrorResponse) => {
        if (e.error.forUser) {
          Swal.fire({
            icon: "error",
            title: e.error.message,
            text: e.error.text,
            showConfirmButton: false,
            timer: 2000
          })
        } else {
          Swal.fire({
            icon: "error",
            title: 'Error getting history',
            text: `Something happened, we couldn't get your history. Try again later`,
            showConfirmButton: false,
            timer: 2000
          });
        }
      }
    })
  }
}


