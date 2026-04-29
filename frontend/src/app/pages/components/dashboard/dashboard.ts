import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  ngOnInit(): void {
    console.log('Entré al Dashboard')
  }
  logout(){
    
  }
}
