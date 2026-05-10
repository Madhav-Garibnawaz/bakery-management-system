import { Component, AfterViewInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Hero } from '../hero/hero.component';
import { Category } from '../category/category.component';
declare var $: any;

@Component({ selector: 'app-home',
  standalone: true,
  imports: [Hero, Category],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css', })
export class Home implements AfterViewInit, OnDestroy {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.reinitCarousel();
      }, 50);
    }
  }

  reinitCarousel(): void {
    const $carousel = $(".testimonial-carousel");
    
    if ($carousel.hasClass('owl-loaded')) {
      $carousel.owlCarousel('destroy');
    }

    $carousel.owlCarousel({
      autoplay: false,
      smartSpeed: 1000,
      margin: 25,
      loop: true,
      center: true,
      dots: false,
      nav: true,
      navText : [
        '<i class="bi bi-chevron-left"></i>',
        '<i class="bi bi-chevron-right"></i>'
      ],
      responsive: {
        0:{ items:1 },
        768:{ items:2 },
        992:{ items:3 }
      }
    });
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      $(".testimonial-carousel").owlCarousel('destroy');
    }
  }
}