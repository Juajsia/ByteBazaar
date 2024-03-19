import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { PasswordComponent } from './pages/password/password.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProductComponent } from './pages/product/product.component';
import { loginGuard } from './guards/login.guard';
import { ProductsComponent } from './pages/products/products.component';

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
    path: 'product',
    component: ProductComponent
}, {
    title: 'List Prducts',
    path: 'products',
    component: ProductsComponent
}];
