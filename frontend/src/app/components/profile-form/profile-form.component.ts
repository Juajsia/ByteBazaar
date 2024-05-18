import { Component } from '@angular/core';
import { Client } from '../../interfaces/client';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { ClientService } from '../../services/client.service';
import { CredentialsService } from '../../services/credentials.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.css'
})
export class ProfileFormComponent {

  id = localStorage.getItem('cid')
  xIcon = faXmark
  diskIcon = faFloppyDisk

  client: Client = {
    id: this.id!,
    firstName: '',
    secondName: '',
    lastName1: '',
    lastName2: '',
    email: '',
    password: ''
  }

  constructor(private _ClientService: ClientService, private _CredentialService: CredentialsService) {

  }

  ngAfterViewInit() {
    this.getClientData()
  }

  getClientData() {
    this._ClientService.getClient(this.id!).subscribe(data => {
      this.client = { ...data }

      this._CredentialService.getCred(this.id!).subscribe(data => {
        this.client.email = data.email
        if (!this.client.secondName || this.client.secondName === " ") {
          this.client.secondName = ''
        }
        this.form.setValue({
          email: this.client.email,
          firstName: this.client.firstName,
          secondName: this.client.secondName,
          lastName1: this.client.lastName1,
          lastName2: this.client.lastName2!
        })
      })

    })
  }

  form = new FormGroup({
    email: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    secondName: new FormControl(''),
    lastName1: new FormControl('', Validators.required),
    lastName2: new FormControl('', Validators.required)
  })

  save() {
    const updatedClient: Client = {
      id: this.id!,
      firstName: this.form.value.firstName!,
      secondName: this.form.value.secondName! || " ",
      lastName1: this.form.value.lastName1!,
      lastName2: this.form.value.lastName2!,
      email: this.form.value.email!,
      password: ''
    }

    this._ClientService.updateClient(String(updatedClient.id), updatedClient).subscribe({
      next: () => {
        Swal.fire({
          icon: "success",
          title: "Successful Update",
          text: `${updatedClient.firstName + " " + updatedClient.lastName1}'s profile updated!!`,
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.reload()
        })
      },
      error: (e: HttpErrorResponse) => {
        Swal.fire({
          icon: "error",
          title: "Error Updating",
          text: `profile has not been updated!! \n ${e.error.message || ""}`,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  cancel() {
    Swal.fire({
      icon: "info",
      title: "Profile not Update",
      text: 'No changes have been made!',
      showConfirmButton: false,
      timer: 1200
    }).then(() => {
      window.location.reload()
    })
  }

}
