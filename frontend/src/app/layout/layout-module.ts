import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout';
import { SidebarComponent } from './sidebar/sidebar';
import { NavbarHorizontalComponent } from './navbar/navbar';
import { Router, RouterModule } from '@angular/router';
import { LandingLayoutComponent } from './landing-layout/landing-layout';
import { SharedModule } from '../shared/shared-module';




@NgModule({
  declarations: [
    DashboardLayoutComponent,
    SidebarComponent,
    LandingLayoutComponent
  ],
  imports: [CommonModule, RouterModule,SharedModule,NavbarHorizontalComponent],
  exports: [DashboardLayoutComponent, LandingLayoutComponent],
})
export class LayoutModule {}
