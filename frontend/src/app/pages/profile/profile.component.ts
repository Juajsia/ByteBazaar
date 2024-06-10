import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ClientService } from '../../services/client.service';
import { CredentialsService } from '../../services/credentials.service';
import { Client } from '../../interfaces/client';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { ProfileFormComponent } from '../../components/profile-form/profile-form.component';
import { ProfileService } from '../../services/profile.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent, FontAwesomeModule, ProfileFormComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  editIcon = faPen
  rol = localStorage.getItem('rol')
  showForm = false

  id = localStorage.getItem('cid')
  client: Client = {
    id: this.id!,
    firstName: '',
    secondName: '',
    lastName1: '',
    lastName2: '',
    email: '',
    password: '',
    photoUrl: ''
  }


  constructor(private _ClientService: ClientService, private _CredentialService: CredentialsService, private _ProfileService: ProfileService) {

  }

  ngAfterViewInit() {
    this.getClientData()
  }

  getClientData() {
    this._ClientService.getClient(this.id!).subscribe(data => {
      this.client = { ...data }
      if (this.client.photoUrl !== 'https://cdn-icons-png.flaticon.com/512/149/149071.png') {
        this.client.photoUrl = 'http://localhost:3000/' + this.client.photoUrl
      }
      this._CredentialService.getCred(this.id!).subscribe(data => {
        this.client.email = data.email
        if (!this.client.secondName) {
          this.client.secondName = ''
        }
      })
    })
  }

  saveImage(fileInput: any): void {
    const file: File = fileInput.files[0];
    if (file) {
      this._ProfileService.uploadImage(file, String(this.client.id)).subscribe({
        next: (response) => {
          // console.log('Imagen subida correctamente:', response)
          window.location.reload()
        },
        error: (error) => {
          console.error('Error al subir la imagen:', error)
          // Aquí puedes manejar errores, como mostrar un mensaje al usuario
        }
      }
      );
    }
  }

}
