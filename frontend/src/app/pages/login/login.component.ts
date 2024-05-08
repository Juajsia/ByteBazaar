import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CredentialsService } from '../../services/credentials.service';
import { FormsModule } from '@angular/forms';
import { Credential } from '../../interfaces/credential';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2'
import { GoogleLoginProvider, FacebookLoginProvider, GoogleSigninButtonModule, SocialAuthService, SocialLoginModule, SocialUser } from "@abacritt/angularx-social-login";
import { ClientService } from '../../services/client.service';
import { Client } from '../../interfaces/client';
import { Observable, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, SocialLoginModule, GoogleSigninButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  email: string = ''
  password: string = ''
  error: string = ''
  error1: string = ''
  // error2: string = ''

  user: SocialUser = new SocialUser();
  loggedIn: boolean = false;

  constructor(private _credentialService: CredentialsService, private router: Router, private authService: SocialAuthService, private _clientService: ClientService) {
  }

  ngOnInit() {
    if(localStorage.getItem('logout')) {
      this.signOut()
      localStorage.removeItem('logout')
    }
    this.authService.authState.subscribe(async (user: SocialUser): Promise<void> => {
      if (user) {
        this.user = user;
        this.loggedIn = (this.user != null);
        const registeredUser = await lastValueFrom(this.isRegistered(user.email))
        if (registeredUser) {
          this.email = registeredUser.email
          this.password = registeredUser.password
          this.login(true)
        } else {
          const doc = await this.checkDocumentUntilSuccess()
          if (doc !== null) {
            this.signUp(user, doc)
          } else {
            Swal.fire({
              icon: "error",
                title: "Could not log in",
                text: "We had a problem trying to log in, try it again later",
                showConfirmButton: false,
                timer: 2000
            });
          }
        }
      }
    });
  }

  isRegistered(email: string): Observable<any> {
    return new Observable<any>((observer) => {
        this._credentialService.checkEmailExistence(email).subscribe({
            next: (res) => {            
                if (res) {
                    observer.next(res); 
                    observer.complete();  
                } else {
                    observer.next(false); 
                    observer.complete();
                }
            },
            error: (error) => {
                observer.error(error);
            }
        });
    });
  }

  signUp(user: SocialUser, doc: bigint){
    const client: Client = {
      id: doc.toString(),
      firstName: user.firstName,
      lastName1: user.lastName,
      lastName2: null,
      email: user.email,
      password: 'P@ssw0rd'
    }

    this._clientService.createClient(client).subscribe({
      next: () => {
        this.router.navigate(['/'])
      }, error: (e: HttpErrorResponse) => {
        Swal.fire({
          icon: "error",
            title: "Could not log in",
            text: "Check the provided credentials and try it again later",
            showConfirmButton: false,
            timer: 2000
          });
        }
    })
  }

  checkDocument(doc: bigint): Observable<boolean> {
    return new Observable<boolean>((observer) => {
        this._clientService.checkIdExistence(doc).subscribe({
            next: (res) => {              
                if (res.id) {
                    observer.next(true); 
                    observer.complete();  
                } else {
                    observer.next(false); 
                    observer.complete();
                }
            },
            error: (error) => {
                observer.error(error);
            }
        });
    });
  }

  async checkDocumentUntilSuccess(): Promise<bigint>{
    let success = true
    let doc: bigint | null = null
    while (success) {
        doc = this.getRandomDoc(11,19)
        success = await lastValueFrom(this.checkDocument(doc))
    }
    if (doc === null) {
      throw new Error("No document found");
    }
    return doc
  }

  getRandomDoc (minLength: number, maxLength: number): bigint {
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let randomNumber = '';
    for (let i = 0; i < length; i++) {        
        const digit = Math.floor(Math.random() * 10);
        randomNumber += digit.toString();
    }
    return BigInt(randomNumber);
  }

  login(hashed: boolean) {
    if (this.validateForm()) {
      const user: Credential = { email: this.email, password: this.password, hashed}
      this._credentialService.login(user).subscribe({
        next: (data) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('rol', data.rol)
          localStorage.setItem('cid', data.cid)
          if (data.rol === 'client')
            localStorage.setItem('cid', data.cid)
          localStorage.setItem('cart', data.cartId)
          this.router.navigate([''])
        },
        error: (e: HttpErrorResponse) => {
          if (e.error.err) {
            // this.error2 = e.error.err
          }
          Swal.fire({
            icon: "error",
            title: "Cannot log in",
            // text: this.error2,
            text: e.error.err,
            showConfirmButton: false,
            timer: 2000
          });
        }
      })
    }

  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      user => {
        this.user = user;
        this.loggedIn = (user != null);
      }
    );
  }

  signOut(): void {
    this.authService.signOut();
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(this.email)) {
      this.error = 'Please enter a valid Email'
      return false
    }

    const validPassword = /^(?=.*[A-Z])(?=.*[\W_]+).{8,}$/
    if (!validPassword.test(this.password)) {
      this.error1 = 'Please enter a valid password'
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
