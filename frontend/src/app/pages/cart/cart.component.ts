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

  constructor(private router: Router) {

  }
}
