import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faArrowRight, faTrash, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../interfaces/category';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NavbarComponent, FontAwesomeModule, RouterLink, NgStyle],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  seeAppsIcon = faArrowRight
  deleteIcon = faTrash
  editIcon = faPenToSquare
  addIcon = faPlus

  rol = localStorage.getItem('rol')

  images: string[] = [
    'https://fotografias.lasexta.com/clipping/cmsimages01/2020/05/08/E3BC9A26-F5D7-4B1D-9497-72A52CE9CB79/98.jpg?crop=1300,731,x0,y19&width=1900&height=1069&optimize=high&format=webply',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2-HLOYkcsLxae3geq3egU82FTxpdo0e-weQ&usqp=CAU',
    'data:image/jpeg;base64,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',
    'https://img.freepik.com/vector-premium/fondo-pantalla-minimalista-montanas-azules-sol-computadora_621211-143.jpg',
    'https://www.xtrafondos.com/wallpapers/resoluciones/21/montanas-minimalista-degradado-azul_1920x1080_7869.jpg',
    'https://wallpapers.com/images/hd/minimalist-purple-3840-x-2160-hxnydj83kghcgs8k.jpg'
  ];
  currentIndex: number = 0;

  listCategory: Category[] = []

  constructor(private _categoryService: CategoryService, private router: Router) {
  }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this._categoryService.getAllCategory().subscribe((data) => {
      this.listCategory = data
      console.log(this.listCategory)
    })
  }

  loadImage(): string {
    const imageUrl = this.images[this.currentIndex]
    this.currentIndex++
    if (this.currentIndex >= this.images.length) {
      this.currentIndex = 0
    }
    return imageUrl
  }

  seeApps(catId: number){
    this.router.navigate([`/products/${catId}`])
  }
}
