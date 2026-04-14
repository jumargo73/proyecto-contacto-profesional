import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // <-- Importa esto
import { ReactiveFormsModule } from '@angular/forms';
import { App } from './app'; 
import { ContactoFormComponent } from './components/contacto-form/contacto-form';

@NgModule({
  declarations: [
    App // <-- DEBE SER CLÁSICO (Sin standalone: true)
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // <-- REGISTRA ESTO AQUÍ
    ReactiveFormsModule,
    ContactoFormComponent
  ],
  bootstrap: [App]
})  
export class AppModule {}
