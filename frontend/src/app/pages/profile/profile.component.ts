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
        if (!this.client.secondName) {
          this.client.secondName = ''
        }
      })
    })
  }

}
