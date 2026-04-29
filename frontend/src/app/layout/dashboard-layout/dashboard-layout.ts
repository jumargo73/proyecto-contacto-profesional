import { Component,OnInit } from '@angular/core';
import { UiService } from '../../services/ui.service'
import { ChangeDetectorRef } from '@angular/core';
import { Observable,BehaviorSubject,tap } from 'rxjs';


@Component({
  selector: 'app-dashboard-layout',
  standalone: false,
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayoutComponent implements OnInit {

  constructor(private uiService: UiService,private cd: ChangeDetectorRef) {}
  public isOpen$!: Observable<boolean>
    ngOnInit() {
      this.uiService.sidebarOpen$.subscribe(valor => {
        this.cd.detectChanges();   
        console.log('El Sidebar acaba de RECIBIR:', valor);
      });
      this.isOpen$=this.uiService.sidebarOpen$
      console.log("estado del menu en sidebar,ts",this.isOpen$) 
      console.log('Entré al DashboardLayoutComponent')
    }


  toggleSidebar() {
    this.uiService.toggleSidebar();  
    this.cd.detectChanges();   
    console.log("eestado del menu en sidebar,ts",this.isOpen$)  
  }

}
