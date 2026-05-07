import { Component,OnInit } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports:[CommonModule,RouterModule],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services implements OnInit {

  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
    
  }
}
