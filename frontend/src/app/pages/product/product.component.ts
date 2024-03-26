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
  faPenToSquare
} from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NavbarComponent, RouterLink, FontAwesomeModule],
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

  role = localStorage.getItem('rol')
}
