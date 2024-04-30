import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CredentialsService } from '../../services/credentials.service';
import { FormsModule } from '@angular/forms';
import { Credential } from '../../interfaces/credential';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = ''
  password: string = ''
  constructor(private _credentialService: CredentialsService, private router: Router) {
  }

  login() {
    if (this.validateForm()) {
      const user: Credential = { email: this.email, password: this.password }
      this._credentialService.login(user).subscribe({
        next: (data) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('rol', data.rol)
          if (data.rol === 'client')
            localStorage.setItem('cid', data.cid)
          localStorage.setItem('cart', data.cartId)
          this.router.navigate([''])
        },
        error: (e: HttpErrorResponse) => {
          Swal.fire({
            icon: "error",
            title: "Email or password invalid",
            text: "Cannot log in. Check the fields and try again",
            showConfirmButton: false,
            timer: 2000
          });
        }
      })
    }

  }

  validateForm() {
    if (!this.email || !this.password) {
          Swal.fire({
            icon: "warning",
            title: "Please input all the required data",
            text: "There are missing fields",
            showConfirmButton: false,
            timer: 2000
          });
      return false
    }
    const validPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!validPassword.test(this.password) || !validEmail.test(this.email)) {
      Swal.fire({
        icon: "error",
        title: "Email or password invalid",
        text: "Check if the form fields are correctly filled in",
        showConfirmButton: false,
        timer: 2000
      });
      return false
    }
    return true
  }
}
