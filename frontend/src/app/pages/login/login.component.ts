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
<<<<<<< HEAD
=======
  error: string = ''
  error1: string = ''
  error2: string = ''
>>>>>>> a23ccdcf6a9ca3014a1dc814dbedabb4f58953f8
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
<<<<<<< HEAD
          Swal.fire({
            icon: "error",
            title: "Email or password invalid",
            text: "Cannot log in. Check the fields and try again",
=======
          if (e.error.err) {
            this.error2 = e.error.err
          }
          Swal.fire({
            icon: "error",
            title: "Invalid email or password",
            text: this.error2,
>>>>>>> a23ccdcf6a9ca3014a1dc814dbedabb4f58953f8
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
<<<<<<< HEAD
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
=======

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(this.email)) {
      this.error = 'Please enter a valid Email'
      return false
    }

    const validPassword = /^(?=.*[A-Z])(?=.*[\W_]+).{8,}$/
    if (!validPassword.test(this.password)) {
      this.error1 = 'Please enter a valid password'
>>>>>>> a23ccdcf6a9ca3014a1dc814dbedabb4f58953f8
      return false
    }
    return true
  }

  validPassword() {
    setTimeout(() => {
      const validPassword = /^(?=.*[A-Z])(?=.*[\W_]+).{8,}$/
      if (!validPassword.test(this.password)) {
        this.error1 = 'Please enter a valid password'
      } else {
        this.error1 = ''
      }
    }, 500);
  }

  validEmail() {
    setTimeout(() => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(this.email)) {
        this.error = 'Please enter a valid Email'
      } else {
        this.error = ''
      }
    }, 500)
  }
}
