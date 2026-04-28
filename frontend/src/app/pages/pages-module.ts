import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dashboard } from './components/dashboard/dashboard';
import { ProfileComponent } from './components/profile/profile.component';
import { Router, RouterModule } from '@angular/router';
import { ServiceManagement } from './components/service-management/service-management';


@NgModule({
  declarations: [Dashboard, ProfileComponent],
  imports: [CommonModule,RouterModule,ServiceManagement],
})
export class PagesModule {}
