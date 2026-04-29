// ui.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UiService {
  private sidebarOpen = new BehaviorSubject<boolean>(false);
  
  sidebarOpen$ = this.sidebarOpen.asObservable();

  toggleSidebar() {

    const newValue = !this.sidebarOpen.value;
    console.log('Cambiando estado a:', newValue);
    this.sidebarOpen.next(newValue);
  }
}
