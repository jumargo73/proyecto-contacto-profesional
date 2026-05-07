import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Services } from './components/services/services';
import { About } from './components/about/about';
import { Proyectos } from './components/proyectos/proyectos';
import { SaberMas } from './components/saber-mas/saber-mas';
import { Taxi } from './components/services/taxi/taxi';

@NgModule({
  declarations: [About, Proyectos, SaberMas],
  imports: [CommonModule,Taxi,Services],
})
export class PagesModule {}
