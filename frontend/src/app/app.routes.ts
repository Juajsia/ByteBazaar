import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { PasswordComponent } from './pages/password/password.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProductComponent } from './pages/product/product.component';
import { loginGuard } from './guards/login.guard';
import { ProductsComponent } from './pages/products/products.component';
import { CartComponent } from './pages/cart/cart.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

export const routes: Routes = [{
    title: 'Home',
    path: '',
    component: HomeComponent
}, {
    title: 'Login',
    path: 'login',
    component: LoginComponent,
}, {
    title: 'SignUp',
    path: 'signUp',
    component: SignUpComponent
}, {
    title: 'Password',
    path: 'login/changePassword',
    component: PasswordComponent
}, {
    title: 'Categories',
    path: 'categories',
    component: CategoriesComponent
}, {
    title: 'Product',
    path: 'product/:name',
    component: ProductComponent
}, {
    title: 'List Prducts',
    path: 'products/:catId',
    component: ProductsComponent
}, {
    title: 'Cart',
    path: 'cart',
    component: CartComponent
}, {
    title: 'AboutUs',
    path: 'aboutUs',
    component: AboutUsComponent
}, {
    title: 'CategoryForm',
    path: 'categories/create',
    component: CategoriesComponent
}, {
    title: 'EditProduct',
    path: 'product/:name/edit',
    component: ProductComponent
}, {
    title: 'AddProduct',
    path: 'products/:catId/add',
    component: ProductsComponent
}];
