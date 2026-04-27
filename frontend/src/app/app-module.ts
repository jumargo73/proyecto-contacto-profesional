import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // <-- Importa esto
import { ReactiveFormsModule } from '@angular/forms';
import { App } from './app';
import { ContactoFormComponent } from './contacts/components/contacto-form/contacto-form';
import { HomeModule } from './home/home-module';
import { AppRoutingModule } from './app-routing-module';
import { AuthModule } from './auth/auth-module';
import { PagesModule } from './pages/pages-module';
import { LayoutModule } from './layout/layout-module';
import { SharedModule } from './shared/shared-module';
import { ComponentsModule } from './components/components-module';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // <-- REGISTRA ESTO AQUÍ
    ReactiveFormsModule,
    ContactoFormComponent,
    HomeModule,
    AppRoutingModule,
    AuthModule,
    PagesModule,
    LayoutModule,
    SharedModule,
    ComponentsModule	  
  ],
  bootstrap: [App],
})
export class AppModule {}
