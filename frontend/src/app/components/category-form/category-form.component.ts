import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [NavbarComponent, FontAwesomeModule, FormsModule, ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {
  xIcon = faXmark
  diskIcon = faFloppyDisk
  pageTitle = 'Add New Category'

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    if (this.router.url === '/categories/edit')
      this.pageTitle = 'Edit Category'
  }

  cancelForm() {
    this.router.navigate(['/categories'])
  }
}
