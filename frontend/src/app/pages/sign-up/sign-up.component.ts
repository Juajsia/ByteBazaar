import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { Client } from '../../interfaces/client';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  textRegex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/
  midNameRegex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]*$/
  numberRegex = /^\d+(\.\d{1,2})?$/
  DocRegex = /^[0-9]\d{7,9}$/
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  form = new FormGroup({
    document: new FormControl('', [Validators.required, Validators.pattern(this.DocRegex)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailRegex)]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.pwdRegex)]),
    password2: new FormControl('', [Validators.required, Validators.pattern(this.pwdRegex)]),
    firstName: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)]),
    middleName: new FormControl('', [Validators.pattern(this.midNameRegex)]),
    firstSurname: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)]),
    secondSurname: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)])
  })

  btn = document.querySelector('button')
  formStatus = false
  pwdsEq = true
  midName = document.getElementById('middleName')?.textContent!
  notLetters = false

  constructor(private _clientService: ClientService, private router: Router) {
  }

  ngOnInit() {
    this.validateFields()
  }

  signUp() {
    if (!this.validatePwd()) {
      alert("password confirmation is not equal to password")
      return false
    }

    const client: Client = {
      id: Number(this.form.value.document!),
      firstName: this.form.value.firstName!,
      secondName: this.form.value.middleName!,
      lastName1: this.form.value.firstSurname!,
      lastName2: this.form.value.secondSurname!,
      email: this.form.value.email!,
      password: this.form.value.password!
    }

    this._clientService.createClient(client).subscribe({
      next: () => {
        Swal.fire({
          icon: "success",
          title: "Successful sign up",
          text: `User ${client.firstName} Registered!!`,
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/login'])
      }, error: (e: HttpErrorResponse) => {
        if(e.error.forUser){
          Swal.fire({
            icon: "error",
            title: e.error.message,
            text: e.error.text,
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error signing up",
            text: "Check the form fields and try later",
            showConfirmButton: false,
            timer: 2000
          });
        }
      }
    })

    return true
  }

  validatePwd() {
    return this.form.value.password === this.form.value.password2
  }

  validateMidName(){
    return !this.midName || /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]*$/.test(this.midName)
  }

  testMidName(){
    this.midName = document.getElementById('middleName')?.textContent!
    console.log(document.getElementById('middleName'))
    return /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]*$/.test(this.midName)
  }

  validateFields() {
    if (this.form.invalid)
      this.formStatus = false
    else
      this.formStatus = true
  }
}
