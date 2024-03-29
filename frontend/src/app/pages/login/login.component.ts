import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CredentialsService } from '../../services/credentials.service';
import { FormsModule } from '@angular/forms';
import { Credential } from '../../interfaces/credential';
import { HttpErrorResponse } from '@angular/common/http';

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
  error: string = ''
  constructor(private _credentialService: CredentialsService, private router: Router) {
  }

  login() {
    if (this.validateForm()) {
      const user: Credential = { email: this.email, password: this.password }
      this._credentialService.login(user).subscribe({
        next: (data) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('rol', data.rol)
          this.router.navigate([''])
        },
        error: (e: HttpErrorResponse) => {
          this.error = 'Invalid email or password'
        }
      })
    }

  }

  validateForm() {
    if (!this.email || !this.password) {
      this.error = 'Please check all fields'
      return false
    }
    const validPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!validPassword.test(this.password)) {
      this.error = 'Please enter a valid password'
      return false
    }
    return true
  }
}
