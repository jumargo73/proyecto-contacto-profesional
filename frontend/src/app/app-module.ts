import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // <-- Importa esto
import { ReactiveFormsModule } from '@angular/forms';
import { App } from './app'; 
import { ContactoFormComponent } from './contacts/components/contacto-form/contacto-form';
import { SharedModule } from './shared/shared-module';
import { HomeModule } from './home/home-module';
import { AppRoutingModule } from './app-routing-module';
import { AuthModule } from './auth/auth-module';
import { PagesModule } from './pages/pages-module';

@NgModule({
  declarations: [
    App // <-- DEBE SER CLÁSICO (Sin standalone: true)
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // <-- REGISTRA ESTO AQUÍ
    ReactiveFormsModule,
    ContactoFormComponent,
    SharedModule,
    HomeModule,
    AppRoutingModule,
    AuthModule,
    PagesModule

  ],
  bootstrap: [App]
})  
export class AppModule {}
