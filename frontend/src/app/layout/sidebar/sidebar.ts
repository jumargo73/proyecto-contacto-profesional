import { Component,OnInit } from '@angular/core';
import { UiService } from '../../services/ui.service'
import { Observable,BehaviorSubject,tap } from 'rxjs';


@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent implements OnInit {
  
  public isOpen$!: Observable<boolean>;
  
  constructor(private uiService: UiService) {}

  ngOnInit() {
    this.isOpen$ = this.uiService.sidebarOpen$;
  }
  
}
