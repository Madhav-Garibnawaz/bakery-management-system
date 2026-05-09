import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
  
})

export class Header implements OnInit {
  user: any = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    const storedUser = sessionStorage.getItem('user');
    if(storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  logout() {
    sessionStorage.removeItem('user');
    this.user = null;
    this.router.navigate(['/home']);
  }
}
