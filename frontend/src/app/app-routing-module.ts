import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Banner } from './home/components/banner/banner';
import { ContactoFormComponent } from './contacts/components/contacto-form/contacto-form'
const routes: Routes = [ 
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Banner },
  { path: 'contacto', component: ContactoFormComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
