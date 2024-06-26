import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

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
  id = 0
  formStatus = false

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })

  constructor(private router: Router, private aRouter: ActivatedRoute, private _categoryService: CategoryService) {
    this.id = Number(this.aRouter.snapshot.paramMap.get('id')!)
  }



  ngOnInit(): void {
    if (this.router.url === '/categories/create') {
      this.pageTitle = 'Create Category'
    }
    else {
      this.pageTitle = 'Edit Category'
      this.getCategory()
    }
  }

  goBack() {
    this.router.navigate(['/categories'])
  }

  getCategory() {
    this._categoryService.getCategory(this.id).subscribe((res: Category) => {
      this.form.setValue({
        title: res.name,
        description: res.description
      })
    })
  }

  saveData() {
    const category: Category = {
      name: this.form.value.title!,
      description: this.form.value.description!
    }

    if (this.pageTitle === 'Create Category') {
      this._categoryService.createCategory(category).subscribe({
        next: () => {
          Swal.fire({
            icon: "success",
            title: "Successful create Category",
            text: `Category ${category.name} created!!`,
            showConfirmButton: false,
            timer: 1500
          })
          this.goBack()
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
              title: "Error creating category",
              text: `Check the form fields and try later`,
              showConfirmButton: false,
              timer: 2000
            })
          }
        }
      })
    } else {
      this._categoryService.updateCategory(this.id, category).subscribe({
        next: () => {
          Swal.fire({
            icon: "success",
            title: "Successful update Category",
            text: `Category ${category.name} updated!!`,
            showConfirmButton: false,
            timer: 1500
          });
          this.goBack()
        }, error: (e: HttpErrorResponse) => {
          Swal.fire({
            icon: "error",
            title: "error updating category",
            text: `Category ${category.name} has not been updated!!`,
            showConfirmButton: false,
            timer: 1500
          })
        }

      })
    }
  }
}
