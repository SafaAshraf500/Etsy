import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AccessoriesComponent } from './accessories-component/accessories.component';
import { ClothingComponent } from './clothing-component/clothing.component';
import { BooksComponentComponent } from './books-component/books.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ProductDetailsComponent } from './productdetails/productdetails.component';
import { CartComponent } from './cart/cart.component';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'accessories', component: AccessoriesComponent },
  { path: 'clothing', component: ClothingComponent},
  { path: 'books', component: BooksComponentComponent},
  { path: 'favorites', component: FavoritesComponent },
  { path: 'productdetails/:id', component: ProductDetailsComponent },
  {path:'cart',component:CartComponent},
  {path:'home',component:HomeComponent}

];
