import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { OrderService } from '../../services/order.service';
import { ClientService } from '../../services/client.service';
import { forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-manage-orders',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './manage-orders.component.html',
  styleUrl: './manage-orders.component.css'
})
export class ManageOrdersComponent {

  orders: any[] = []

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

}
