import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CredentialsService } from '../../services/credentials.service';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})
export class NewPasswordComponent {
  password: string = ''
  repeatPassword: string = ''
  error: string = ''
  error1: string = ''

  constructor(private _credentialService: CredentialsService, private router: Router) {
  }

  updatePassword() {
    if (this.validateForm()) {
      const email = localStorage.getItem('email')
      this._credentialService.updatePassword(email!, this.password).subscribe({
        next: (data) => {
          const { msg } = data
          if (msg) {
            Swal.fire({
              icon: "info",
              title: "Password not Updated",
              text: msg,
              showConfirmButton: false,
              timer: 2000
            }).then(() => {
              this.router.navigate(['/login'])
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "Password Updated",
              text: 'Password Updated Succesfully',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.router.navigate(['/login'])
            });
          }
          localStorage.removeItem('email')
        },
        error: (e: HttpErrorResponse) => {
          let err = ''
          if (e.error.err) {
            err = e.error.err
          }
          Swal.fire({
            icon: "error",
            title: "Error Updating Password",
            text: err,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })

    }

  }

  validateForm() {
    if (!this.password || !this.repeatPassword) {
      this.error = 'Please check all fields'
      return false
    }
    const validPassword = /^(?=.*[A-Z])(?=.*[\W_]+).{8,}$/
    if (!validPassword.test(this.password)) {
      this.error = 'Please enter a valid password'
      return false
    }

    if (this.password !== this.repeatPassword) {
      this.error1 = 'Passwords do not match'
      return false
    }
    return true
  }


  validPassword() {
    setTimeout(() => {
      const validPassword = /^(?=.*[A-Z])(?=.*[\W_]+).{8,}$/
      if (!validPassword.test(this.password)) {
        this.error = 'Please enter a valid password'
      } else {
        this.error = ''
      }
    }, 500);
  }

  samePassword() {
    setTimeout(() => {
      if (this.password !== this.repeatPassword) {
        this.error1 = 'Passwords do not match'
      } else {
        this.error1 = ''
      }
    }, 400);
  }
}
