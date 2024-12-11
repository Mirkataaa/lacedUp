import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { SneakersComponent } from './products/sneakers/sneakers.component';
import { AccessoriesComponent } from './products/accessories/accessories.component';
import { ClothingComponent } from './products/clothing/clothing.component';
import { DetailsComponent } from './products/details/details.component';
import { CheckoutComponent } from './user/checkout/checkout.component';
import { CartComponent } from './user/cart/cart.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { LoginGuard } from './guards/login.guard';
import { ErrorComponent } from './error/error.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent , canActivate:[LoginGuard]},
  { path: 'register', component: RegisterComponent , canActivate:[LoginGuard]},
  {
    path: 'admin',
    children: [
      { path: 'add-product', component: AddProductComponent , canActivate: [AuthGuard] ,  data: { role: ['admin' , 'manager'] }},
      { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] ,  data: { role: ['admin' , 'manager'] }},
      { path: 'manage-users', component: ManageUsersComponent , canActivate: [AuthGuard] , data: {role: ['admin']}},
    ],
  },
  {
    path: 'products',
    children: [
      { path: 'Sneakers', component: SneakersComponent },
      { path: 'Clothing', component: ClothingComponent },
      { path: 'Accessories', component: AccessoriesComponent },
      { path: ':category/:id', component: DetailsComponent },
    ],
  },
  {path: 'checkout' , component: CheckoutComponent , canActivate: [AuthGuard]},
  {path: 'cart' , component: CartComponent , canActivate: [AuthGuard]},
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' },
];
