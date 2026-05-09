import { Routes } from '@angular/router';

import { Home } from './home/home.component';
import { Login } from './login/login.component';
import { Register } from './register/register.component';
import { About } from './about/about.component';
import { Services } from './services/services.component';
import { Product } from './product/product.component';
import { Contact } from './contact/contact.component';
import { Cart } from './cart/cart.component';
import { Checkout } from './checkout/checkout.component';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'about', component: About },
    { path: 'services', component: Services },
    { path: 'product', component: Product},
    { path: 'contact', component: Contact},
    { path: 'cart', component: Cart },
    { path: 'checkout', component: Checkout },
    { path: '**', redirectTo: '' }
];
