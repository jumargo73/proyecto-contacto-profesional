  // app-routing.module.ts
  import { RouterModule,Routes } from '@angular/router';
  import { NgModule } from '@angular/core';
  import { Login } from './auth/components/login/login'
  import { Register } from './auth/components/register/register'
  import { Banner } from './home/components/banner/banner';
  import { ContactoFormComponent } from './contacts/components/contacto-form/contacto-form';
  import { LandingLayoutComponent } from './layout/landing-layout/landing-layout';
  import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout';
  import { ServiceManagement } from './pages/components/service-management/service-management';

  
  import { ProfileComponent } from './pages/components/profile/profile.component';
  import { AuthGuard } from './services/auth.guard'; // Tu guardia de seguridad
  import { GuestGuard } from './services/guest.guard'; // Tu guardia de seguridad

  const routes: Routes = [
      // Ruta Pública
      
      { 
        path: '', 
        component: LandingLayoutComponent, // Este componente tiene el <app-public-navbar>
        canActivate: [GuestGuard], 
        children: [
          { 
            path: '', 
            redirectTo: 'inicio', 
            pathMatch: 'full' 
          },
          { path: 'inicio', component: Banner },
          { path: 'login', component: Login },
          { path: 'register', component: Register},
          { path: 'contactos', component: ContactoFormComponent}
        ]
      },
      
     


      // Ruta Padre (Privada)
      {
        path: 'dashboard',
        component: DashboardLayoutComponent, // El "cascarón" con el Nav vertical
        canActivate: [AuthGuard],            // Protege a todas las hijas
        children: [
          { 
            path: '', 
            redirectTo: 'dashboard', 
            pathMatch: 'full' 
          },
          { 
            path: 'inicio', 
            component: DashboardLayoutComponent 
          },
          { 
            path: 'perfil', 
            component: ProfileComponent 
          },
          { 
            path: 'services_list', 
            component: ServiceManagement 
          }
        ]
      },

      // Comodín para redirigir si la ruta no existe
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboard' }
    ];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
