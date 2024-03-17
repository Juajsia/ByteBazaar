import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faCartShopping, 
  faBagShopping, 
  faDesktop,
  faMobileScreenButton,
  faTabletScreenButton
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NavbarComponent, FontAwesomeModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  cart = faCartShopping
  bag = faBagShopping
  pc = faDesktop
  phone = faMobileScreenButton
  tablet = faTabletScreenButton
}
