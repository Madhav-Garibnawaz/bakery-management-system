import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Header } from './header/header.component';
import { Footer } from './footer/footer.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Header,
    Footer,
    NgIf
  ],
  templateUrl: './app.html',
})
export class App {

  showLayout = true;

  constructor(private router: Router) {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {

        const currentUrl = event.urlAfterRedirects;

        // Hide header & footer on login page
        this.showLayout = !(
          currentUrl.includes('/login') ||
          currentUrl.includes('/register')
        );
      });

  }
}