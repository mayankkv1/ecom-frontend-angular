import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { CompanyComponent } from './components/company/company.component';
import { ContactComponent } from './components/contact/contact.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoggedInAuthGuardService } from './services/logged-in-auth-guard.service';

const routes: Routes = [
  {path:'', component:HomeComponent, canActivate: [AuthGuardService]},
  {path:'login', component:AuthComponent, canActivate: [LoggedInAuthGuardService]},
  {path:'register', component:AuthComponent, canActivate: [LoggedInAuthGuardService]},
  {path:'products', component:ProductsComponent, canActivate: [AuthGuardService]},
  {path:'company', component:CompanyComponent, canActivate: [AuthGuardService]},
  {path:'contact', component:ContactComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
