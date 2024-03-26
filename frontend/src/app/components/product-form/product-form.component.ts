import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Router, RouterLink } from '@angular/router';
import { Client } from '../../interfaces/client';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  textRegex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/
  numberRegex = /^\d+(\.\d{1,2})?$/
  DocRegex = /^[0-9]\d{7,9}$/
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  form =  new FormGroup({
    document: new FormControl('', [Validators.required, Validators.pattern(this.DocRegex)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailRegex)]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.pwdRegex)]),
    password2: new FormControl('', [Validators.required, Validators.pattern(this.pwdRegex)]),
    firstName: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)]),
    middleName: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)]),
    firstSurname: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)]),
    secondSurname: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)])
  })

  btn = document.querySelector('button')
  formStatus = false

  constructor (private _clientService: ClientService, private router: Router) {

  }

  ngOnInit() {
    this.validateFields()
  }

  signUp () {
    if(!this.validatePwd()){
      alert("password confirmation is not equal to password")
      return false
    }

    const client: Client = {
      id: Number(this.form.value.document!),
      firstName: this.form.value.firstName!,
      secondName: this.form.value.secondSurname!,
      lastName1: this.form.value.firstSurname!,
      lastName2: this.form.value.secondSurname!,
      email: this.form.value.email!,
      password:this.form.value.password!
    }

    this._clientService.createClient(client).subscribe( {
      next:() => {
        alert("Successful sign up")
        this.router.navigate(['/login'])
    }, error: (e: HttpErrorResponse) => {
      alert("error signing up")
    }
  })

  return true
  }

  validatePwd () {
    return this.form.value.password === this.form.value.password2
  }

  validateFields () {  
    if(this.form.invalid)
      this.formStatus = false
    else
      this.formStatus = true
  }
}
