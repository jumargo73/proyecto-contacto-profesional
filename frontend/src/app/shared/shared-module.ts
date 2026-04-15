import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  declarations: [Navbar, Footer],
  imports: [CommonModule,RouterModule],
  exports: [Navbar, Footer]
})
export class SharedModule {}
