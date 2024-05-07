import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ClientService } from '../../services/client.service';
import { CredentialsService } from '../../services/credentials.service';
import { Client } from '../../interfaces/client';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  id = localStorage.getItem('cid')
  client: Client = {
    id: Number(this.id!),
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
    this._ClientService.getClient(Number(this.id)).subscribe(data => {
      this.client = { ...data }

      this._CredentialService.getCred(Number(this.id)).subscribe(data => {
        this.client.email = data.email
        if (!this.client.secondName) {
          this.client.secondName = ''
        }
      })

    })
  }

}
