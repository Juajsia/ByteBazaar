import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { OrderService } from '../../services/order.service';
import { ClientService } from '../../services/client.service';
import { forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faX, faReceipt, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-manage-orders',
  standalone: true,
  imports: [NavbarComponent, FontAwesomeModule],
  templateUrl: './manage-orders.component.html',
  styleUrl: './manage-orders.component.css'
})
export class ManageOrdersComponent {

  orders: any[] = []
  xIcon = faX
  detailsIcon = faReceipt
  returnIcon = faRotateLeft
  selected = 0
  showOrder = false

  constructor(private _OrderService: OrderService, private _ClientService: ClientService) {

  }

  ngOnInit() {
    this.getOrders()
  }

  getOrders() {
    this._OrderService.getAllOrders().pipe(
      mergeMap(orders => {
        this.orders = orders

        const clientRequests = orders.map((order: any) =>
          this._ClientService.getClient(order.clientId).pipe(
            map(client => {
              const date = new Date(order.createdAt);
              const formattedDate = date.toLocaleDateString()
              const formattedTime = date.toLocaleTimeString()

              const totalPrice = order.Products.reduce((total: any, product: any) => total + product.price, 0);

              return {
                order,
                clientName: `${client.firstName} ${client.lastName1}`,
                formattedDate,
                formattedTime,
                totalPrice
              }
            })
          )
        )

        return forkJoin(clientRequests);
      })
    ).subscribe((results: any) => {
      results.forEach((result: any) => {
        result.order.clientName = result.clientName
        result.order.date = result.formattedDate
        result.order.time = result.formattedTime
        result.order.totalPrice = result.totalPrice
      });
      console.log(this.orders)
    });
  }

  showOrderDetails(id: number) {
    this.showOrder = true
    this.selected = id
  }

  returnOrder(id: number) {
    Swal.fire({
      title: "Are you sure you want to return this order?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes, return it",
      denyButtonText: `Don't return`
    }).then((result) => {
      if (result.isConfirmed) {
        this._OrderService.returnOrder(id).subscribe({
          next: (data) => {
            Swal.fire({
              icon: "success",
              title: `Order #${id} Returned`,
              text: data.message,
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              window.location.reload()
            })
          },
          error: (e: HttpErrorResponse) => {
            Swal.fire({
              icon: "error",
              title: "Could not Return Order",
              text: e.error.message,
              showConfirmButton: false,
              timer: 2000
            });
          }
        })
      } else if (result.isDenied) {
        Swal.fire({
          icon: "info",
          title: `Order was not returned `,
          showConfirmButton: false,
          timer: 1500
        });
      }
    });



  }
}
