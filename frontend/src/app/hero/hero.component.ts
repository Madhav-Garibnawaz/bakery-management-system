// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-hero',
//   standalone: true,
//   // imports: [],
//   templateUrl: './hero.component.html',
//   styleUrl: './hero.component.css'
// })
// export class Hero {}


import { Component, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class Hero implements AfterViewInit, OnDestroy {

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Use a small delay to ensure Angular's hydration is finished
      setTimeout(() => {
        this.initCarousel();
      }, 100);
    }
  }

  private initCarousel(): void {
    const carouselEl = $(".header-carousel");

    // 1. If it was already initialized, destroy it first to avoid UI glitches
    if (carouselEl.hasClass('owl-loaded')) {
      carouselEl.owlCarousel('destroy');
    }

    // 2. Initialize exactly like the template main.js
    carouselEl.owlCarousel({
      autoplay: true,
      smartSpeed: 1500,
      loop: true,
      nav: true,
      dots: false,
      items: 1,
      navText: [
        '<i class="bi bi-chevron-left"></i>',
        '<i class="bi bi-chevron-right"></i>'
      ]
    });
  }

  ngOnDestroy(): void {
    // Clean up to prevent memory leaks when navigating away
    if (isPlatformBrowser(this.platformId)) {
      $(".header-carousel").owlCarousel('destroy');
    }
  }
}