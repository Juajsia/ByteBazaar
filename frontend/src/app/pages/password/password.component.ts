import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewPasswordComponent } from '../../components/new-password/new-password.component';
import { CredentialsService } from '../../services/credentials.service';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [RouterLink, NewPasswordComponent, FormsModule],
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordComponent {
  email: string = ''
  error: string = ''
  activeForm = false

  constructor(private _credentialService: CredentialsService) {
  }

  changePassword() {
    if (this.validateForm()) {

      this._credentialService.findEmail(this.email).subscribe({
        next: (data) => {
          this.activeForm = true
          localStorage.setItem('email', this.email)
        },
        error: (e: HttpErrorResponse) => {
          this.error = e.error.err || ''
          Swal.fire({
            icon: "error",
            title: "Invalid email",
            text: this.error,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
    }
  }

  validateForm() {
    if (!this.email) {
      this.error = 'Please check all fields'
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(this.email)) {
      this.error = 'Please enter a valid Email'
      return false
    }
    return true
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
