import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { ViewCategoryComponent } from './category/view-category/view-category.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ViewProductComponent } from './product/view-product/view-product.component';
import { ViewUsers } from './view-users/view-users.component';
import { ViewOrders } from './view-orders/view-orders.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'category/add', component: AddCategoryComponent },
  { path: 'category/view', component: ViewCategoryComponent },
  { path: 'product/add', component: AddProductComponent },
  { path: 'product/view', component: ViewProductComponent },
  { path: 'users', component: ViewUsers},
  { path: 'orders', component: ViewOrders},

  { path: '**', redirectTo: 'login' }
];



