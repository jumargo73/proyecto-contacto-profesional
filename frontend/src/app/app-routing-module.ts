import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Banner } from './home/components/banner/banner';
import { ContactoFormComponent } from './contacts/components/contacto-form/contacto-form'
import { Login } from './auth/components/login/login'
import { Register } from './auth/components/register/register'
import { Dashboard }  from './pages/components/dashboard/dashboard'

const routes: Routes = [ 
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Banner },
  { path: 'contacto', component: ContactoFormComponent },
  {path: 'login', component: Login},
  {path: 'register', component: Register},
  {path: 'dashboard', component: Dashboard}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
