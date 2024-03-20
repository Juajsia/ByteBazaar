import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faTrash,
  faXmark
 } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lateral-cart',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './lateral-cart.component.html',
  styleUrl: './lateral-cart.component.css'
})
export class LateralCartComponent {
  trashIcon = faTrash
  xMark = faXmark
  show = true

  ngOnInit(){
    this.show = true
  }

  hideCart(){
    switch (localStorage.getItem('cartStatus')) {
      case 'true':
        this.show = false
        localStorage.setItem('cartStatus', `${this.show}`)  
        break;
      default:
        this.show = true
        localStorage.setItem('cartStatus', `${this.show}`)
    }
  }
}
