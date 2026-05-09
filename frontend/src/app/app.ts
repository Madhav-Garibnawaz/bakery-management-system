// import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// import { Header } from './header/header.component';
// import { Footer } from './footer/footer.component';
// // import { Hero } from './hero/hero.component';


// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [Header, Footer, RouterOutlet],
//   templateUrl: './app.html'
//   // template: `
//   //   <router-outlet></router-outlet>
//   // `
// })
//   // template: `
//   //   <app-header></app-header>
//   //   <app-hero></app-hero>
//   //   <router-outlet></router-outlet>
//   //   <app-footer></app-footer>
//   // `

//   // templateUrl: './app.html',
//   // imports: [RouterOutlet],
//   // templateUrl: './app.html',
//   // styleUrl: './app.css'

// export class App {
//   // protected readonly title = signal('frontend');
// }


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