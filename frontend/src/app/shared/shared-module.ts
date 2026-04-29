import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicNavbar } from './components/public-navbar/public-navbar';
import { Footer } from './components/footer/footer';
import { RouterModule } from '@angular/router'
import { PagesModule } from './pages/pages-module'

@NgModule({
  declarations: [PublicNavbar, Footer],
  imports: [CommonModule,RouterModule,PagesModule],
  exports:[ PublicNavbar,Footer]
})
export class SharedModule {}
