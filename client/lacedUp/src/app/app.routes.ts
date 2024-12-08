import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { SneakersComponent } from './products/sneakers/sneakers.component';
import { AccessoriesComponent } from './products/accessories/accessories.component';
import { ClothingComponent } from './products/clothing/clothing.component';
import { DetailsComponent } from './products/details/details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin',
    children: [{ path: 'add-product', component: AddProductComponent }],
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
];
