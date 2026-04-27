import { Component,OnInit } from '@angular/core';
import { UiService } from '../../services/ui.service'
import { Observable,BehaviorSubject,tap } from 'rxjs';
import { AuthService } from '../../services/auth';


@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent implements OnInit {
  
  public isOpen$!: Observable<boolean>;
  
  constructor(private uiService: UiService,private authService: AuthService) {}

  ngOnInit() {
    this.isOpen$ = this.uiService.sidebarOpen$;
  }

  onLogout(){
    this.authService.logout();
  }

  toggleSidebar() {
    this.uiService.toggleSidebar();
  }
  
}
