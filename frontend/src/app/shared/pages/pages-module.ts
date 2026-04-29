import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Services } from './components/services/services';
import { About } from './components/about/about';

@NgModule({
  declarations: [Services, About],
  imports: [CommonModule],
})
export class PagesModule {}
