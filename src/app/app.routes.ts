import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ForgetPasswordComponent } from './features/auth/forget-password/forget-password.component';
import { ResetLinkSentComponent } from './features/auth/reset-link-sent/reset-link-sent.component';
import { ShoesComponent } from './components/shoes/shoes.component';
import { ShoeDetailsComponent } from './components/shoe-details/shoe-details.component';
import { authGuard } from './guards/auth.guard';
import { BagsComponent } from './components/bags/bags.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgetPasswordComponent },
  { path: 'reset-link-sent', component: ResetLinkSentComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard]},
  { path: 'shoes', component: ShoesComponent },
  { path: 'shoes/:id', component: ShoeDetailsComponent },
  {path:'bags',component:BagsComponent},
  {path:"**",component:PageNotFoundComponent}


];
