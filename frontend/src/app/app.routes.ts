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
import { AgentChatComponent } from './pages/agent-chat/agent-chat.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { TermsComponent } from './pages/terms/terms.component';

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
    component: CartComponent,
    canActivate: [loginGuard]
}, {
    title: 'AboutUs',
    path: 'aboutUs',
    component: AboutUsComponent
}, {
    title: 'CreateCategory',
    path: 'categories/create',
    component: CategoriesComponent,
    canActivate: [loginGuard]
}, {
    title: 'EditCategory',
    path: 'categories/edit/:id',
    component: CategoriesComponent,
    canActivate: [loginGuard]
}, {
    title: 'EditProduct',
    path: 'product/:name/edit',
    component: ProductComponent,
    canActivate: [loginGuard]
}, {
    title: 'AddProduct',
    path: 'products/:catId/add',
    component: ProductsComponent,
    canActivate: [loginGuard]
}, {
    title: 'AgentChat',
    path: 'agentChat',
    component: AgentChatComponent,
    canActivate: [loginGuard]
}, {
    title: 'BestSellers',
    path: 'products/bestSellers',
    component: ProductsComponent,
    canActivate: [loginGuard]
}, {
    title: 'Profile',
    path: 'profile',
    component: ProfileComponent,
    canActivate: [loginGuard]
}, {
    title: 'Wishlist',
    path: 'wishlist',
    component: WishlistComponent,
    canActivate: [loginGuard]
}, {
    title: 'Terms',
    path: 'terms',
    component: TermsComponent
}];
