import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faXmark,
  faFloppyDisk,
  faCheck,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from '../../services/category.service';
import { Category, Platform } from '../../interfaces/category';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { switchAll } from 'rxjs';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {

  xIcon = faXmark
  diskIcon = faFloppyDisk
  arrowIcon = faChevronDown
  checkIcon = faCheck

  textRegex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/
  stockRegex = /^[1-9]\d*$/
  priceRegex = /^\d*\.?\d+$/
  urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/

  form =  new FormGroup({
    name: new FormControl('', Validators.required),
    stock: new FormControl('', [Validators.required, Validators.pattern(this.stockRegex)]),
    price: new FormControl('', [Validators.required, Validators.pattern(this.priceRegex)]),
    provider: new FormControl('', Validators.required),
    image: new FormControl('', [Validators.required, Validators.pattern(this.urlRegex)]),
    description: new FormControl('', Validators.required),
    specs: new FormControl('', Validators.required)
  })

  btn = document.querySelector('button')
  formStatus = false
  action = ''
  productName = ''
  productId = 0
  catId = 0
  
  categoriesList: Category[] = []
  platformsList: Platform[] = [{id: 1,name:"Computer"},{id: 2,name:"Smartphone"},{id: 3,name:"Tablet"}]

  selectBtn = document.querySelectorAll(".select-btn")
  items = document.querySelectorAll(".item")
  selectFieldText = document.querySelectorAll(".btn-text")
  checkedItemsCat: string[] = []
  selItemsPlat = 0
  selItemsCat = 0
  noPlatSelected = false
  noCatSelected = false

  constructor (private _categoryService: CategoryService, private _productService: ProductService, private router: Router, private aRouter: ActivatedRoute) {
    this.catId = Number(this.aRouter.snapshot.paramMap.get('catId')!)
  }

  ngOnInit() {
    this.getCategories()
    if (this.router.url === `/products/${this.catId}/add`){
      this.action = 'Add new'
      this.validateFields()
    }
    else {
      this.action = 'Edit'
      this.productName = this.aRouter.snapshot.paramMap.get('name')!
    }
  }

  ngAfterViewInit(){
    // select field logic
    this.selectBtn = document.querySelectorAll(".select-btn")
    this.items = document.querySelectorAll(".item")
    this.selectFieldText = document.querySelectorAll(".btn-text")
    
    this.selectBtn!.forEach(e=>{
      e.addEventListener("click", () => {
        e.classList.toggle("open")
      });
    })
    // end of select field logic

    if (this.action === 'Edit'){
      this.getProduct()
      this.validateFields()
    }
  }

  checkItem (itemId: string) {
    const checkedItem = document.getElementById(itemId)
    checkedItem?.classList.toggle('checked')
    const itemText = checkedItem?.textContent
    const itemIndex = this.checkedItemsCat.indexOf(itemText!)
    const wsb = this.whichSelectBelongs(itemId)
    
    if (itemIndex < 0){
      this.checkedItemsCat.push(itemText!)
      if (wsb === 'Platform')
        this.selItemsPlat += 1
      else
        this.selItemsCat += 1
    }
    else {
      this.checkedItemsCat = [...this.deleteItem(this.checkedItemsCat, itemText!)]
      if (wsb === 'Platform')
        this.selItemsPlat -= 1
      else
        this.selItemsCat -= 1
    }

    if (wsb === 'Category'){
      if(this.selItemsCat > 0) {
        this.selectFieldText[0]!.textContent = `(${this.selItemsCat}) Categories`
        this.noCatSelected = false
      }
      else {
        this.selectFieldText[0]!.textContent = `Select Categories`
        this.noCatSelected = true
      }
    } else {
      if(this.selItemsPlat > 0){
        this.selectFieldText[1]!.textContent = `(${this.selItemsPlat}) Platforms`
        this.noPlatSelected = false
      }
      else {
        this.selectFieldText[1]!.textContent = `Select Platforms`
        this.noPlatSelected = true
      }
    }
    this.validateFields()
  }

  whichSelectBelongs(itemId: string): any {
    switch (true) {
      case /PlatItem-\d+/.test(itemId):
        return 'Platform'
      case /CatItem-\d+/.test(itemId):
        return 'Category'
      default:
        return false
    }
  }

  deleteItem(arr: string[], toDelete: string): string[] {
    let newArr: string[] = []
    arr.forEach(item=>{
      if (item !== toDelete)
        newArr.push(item)
    })
    return newArr
  }

  validateFields () {  
    if(this.form.invalid || this.selItemsCat < 1 || this.selItemsPlat < 1)
      this.formStatus = false
    else
      this.formStatus = true
  }

  getCategories() {
    this._categoryService.getAllCategory().subscribe((data) => {
      for (let index = 0; index < data.length; index++) {
        if (data[index].id > 2)
          this.categoriesList.push(data[index])
      }
    })
  }

  saveData() {
    const product: Product = {
      name: this.form.value.name!,
      stock: Number(this.form.value.stock!),
      price: Number(this.form.value.price!),
      provider: this.form.value.provider!,
      image: this.form.value.image!,
      description: this.form.value.description!,
      specs: this.form.value.specs!,
      categories: this.checkedItemsCat
    }

    if (this.action === 'Add new'){
      this._productService.createProduct(product).subscribe( {
          next:() => {
            alert("Product created sucessfully")
            this.goBack()
        }, error: (e: HttpErrorResponse) => {
          alert("error creating product")
        }
      })
    } else {
      this._productService.updateProduct(this.productId, product).subscribe( {
        next:() => {
          alert("Product updated sucessfully")
          this.goBack()
      }, error: (e: HttpErrorResponse) => {
        alert("error updating product")
      }
    })
    }

  }

  getProduct() {
    this._productService.getProduct(this.productName).subscribe((res: Product) => {
      this.form.setValue({
        name: res.name,
        stock: String(res.stock),
        price: String(res.price),
        provider: res.provider,
        image: res.image,
        description: res.description,
        specs: res.specs,
      })

      this.productId = res.id!

      this._categoryService.getAllCategory().subscribe((data) => {
          res.categories.forEach(item=>{
            data.forEach(element=>{
              if (item === element.name){
                if (element.id > 3)
                  this.checkItem(`CatItem-${element.id}`)
                else
                  this.checkItem(`PlatItem-${element.id}`)
              }
            })
          })
      })

    })
  }

  goBack() {
    if(this.action === 'Edit')
    this.router.navigate([`product/${this.productName}`])
    else
      this.router.navigate([`products/${this.catId}`])
  }
}
