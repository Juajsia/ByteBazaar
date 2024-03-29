import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { CategoryService } from '../../services/category.service';
import { Product } from '../../interfaces/product';
import { Category } from '../../interfaces/category';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NavbarComponent, RouterLink, FontAwesomeModule, ProductFormComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  filterCaret = faCaretDown
  addIcon = faPlus
  rol = localStorage.getItem('rol')
  photoshopImg = 'https://w7.pngwing.com/pngs/301/722/png-transparent-adobe-logo-logos-photoshop-logos-and-brands-icon-thumbnail.png'
  role = localStorage.getItem('rol')
  showForm = false
  catId = 0
  productsList: Product[] = []
  prodCatsList: string[] = []
  category = {} as Category

  constructor(private _categoryService: CategoryService, private _productService: ProductService, private router: Router, private aRouter: ActivatedRoute){
    this.catId = Number(this.aRouter.snapshot.paramMap.get('catId')!)
  }

  ngOnInit() {
    if (this.router.url === `/products/${this.catId}/add`)
      this.showForm = true
    else
      this.showForm = false
    this.getProdsByCat()
  }
  
  getProdsByCat() {
    return this._categoryService.getCategory(this.catId).subscribe((data) => {
      const {Products, ...otherProperties}  = data
      this.category = otherProperties
      this.productsList = Products

      this.productsList.forEach(element => {
        this._productService.getProduct(element.name).subscribe((res: Product) => {
          const catsFiltered = res.categories.filter(v => { 
                return !["Computer","Smartphone","Tablet"].includes(v); 
          });
          let concat = catsFiltered.slice(0,2).join(' | ')
          if (concat.length > 16)
            concat = catsFiltered.slice(0,1).join('')
          this.prodCatsList.push(concat)
        })
      });

    })
  }

  addProduct() {
    this.router.navigate([`/products/${this.catId}/add`])
  }

  showProduct(prodId: any){
    console.log(prodId)
    this.router.navigate([`/product/${prodId}`])
  }
}
