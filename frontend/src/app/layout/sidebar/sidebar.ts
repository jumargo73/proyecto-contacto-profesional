import { Component,OnInit } from '@angular/core';
import { UiService } from '../../services/ui.service'
import { Observable,BehaviorSubject,tap } from 'rxjs';
import { AuthService } from '../../services/auth';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent implements OnInit {
  

  public isOpen$!: Observable<boolean>
  
  constructor(private uiService: UiService,private authService: AuthService,private cd: ChangeDetectorRef) {}

  ngOnInit() {

    this.uiService.sidebarOpen$.subscribe(valor => {
      this.cd.detectChanges();   
      console.log('El Sidebar acaba de RECIBIR:', valor);
    });
    this.isOpen$=this.uiService.sidebarOpen$
    console.log("estado del menu en sidebar,ts",this.isOpen$)  
  }

  onLogout(){
    this.authService.logout();
  }

  toggleSidebar() {
    this.uiService.toggleSidebar();  
    this.cd.detectChanges();   
    console.log("eestado del menu en sidebar,ts",this.isOpen$)  
  }
  
}
