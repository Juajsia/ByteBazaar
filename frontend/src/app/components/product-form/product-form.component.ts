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
import { Category } from '../../interfaces/category';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';

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

  selectBtn = document.querySelector(".select-btn")
  items = document.querySelectorAll(".item")
  categoriesList: Category[] = []
  checkedItems: string[] = []
  selectFieldText = document.querySelector(".btn-text")
  selectEmpty = false
  catId = 0

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
    this.selectBtn = document.querySelector(".select-btn")
    this.items = document.querySelectorAll(".item")
    this.selectFieldText = document.querySelector(".btn-text")
    
    this.selectBtn!.addEventListener("click", () => {
      this.selectBtn!.classList.toggle("open")
    });
    // end of select field logic

    if (this.action === 'Edit'){
      this.getProduct()
      this.validateFields()
    }
  }

  AddSelectItemsEvents () {
    this.items.forEach(item => {
      item.addEventListener("click", () => {
          item.classList.toggle("checked")
  
          let checked = document.querySelectorAll(".checked"),
              btnText = document.querySelector(".btn-text");
  
              if(checked && checked.length > 0){
                  btnText!.textContent = `${checked.length} Selected`
              } else {
                  btnText!.textContent = `Select Language`
              }
      })
   })
  }

  checkItem (itemId: string) {
    const checkedItem = document.getElementById(itemId)
    checkedItem?.classList.toggle('checked')
    const itemText = checkedItem?.textContent
    const itemIndex = this.checkedItems.indexOf(itemText!)

    if (itemIndex < 0)
      this.checkedItems.push(itemText!)
    else 
      this.checkedItems = [...this.deleteItem(this.checkedItems, itemText!)]

    if(this.checkedItems.length > 0) {
      this.selectFieldText!.textContent = `(${this.checkedItems.length}) Categories`
      this.selectEmpty = false
    } else {
      this.selectFieldText!.textContent = `Select Categories`
      this.selectEmpty = true
    }

    this.validateFields()
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
    if(this.form.invalid && !this.selectEmpty)
      this.formStatus = false
    else
      this.formStatus = true
  }

  getCategories() {
    this._categoryService.getAllCategory().subscribe((data) => {
      this.categoriesList = data
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
      categories: this.checkedItems
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
              if (item === element.name)
                this.checkItem(`item-${element.id}`)
            })
          })
      })

    })
  }

  goBack() {
    const url = this.router.url
    const splittedUrl = url.split('/')
    console.log(splittedUrl)
    let newUrl = ''
    let limit = 0
    if (this.action === 'Edit')
      limit = splittedUrl.length - 2
    else
      limit = splittedUrl.length - 1

    console.log(limit)
    for (let index = 1; index < limit; index++) {
      newUrl += '/' + splittedUrl[index];
    }
    console.log(newUrl)
    this.router.navigate([`${newUrl}`])
  }
}
