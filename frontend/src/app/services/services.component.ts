import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class Services {

}


// import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';
// import { RouterLink } from '@angular/router';

// declare var WOW: any;

// @Component({
//   selector: 'app-services',
//   standalone: true,
//   imports: [RouterLink],
//   templateUrl: './services.component.html',
//   styleUrl: './services.component.css'
// })
// export class Services implements AfterViewInit {
//   constructor(@Inject(PLATFORM_ID) private platformId: any) {}

//   ngAfterViewInit(): void {
//     if (isPlatformBrowser(this.platformId)) {
//         // Small delay to ensure the DOM is ready
//         setTimeout(() => {
//             if (typeof WOW !== 'undefined') {
//                 new WOW().init();
//             }
//         }, 100);
//     }
//   }
// }

// import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';

// @Component({
//   selector: 'app-services',
//   templateUrl: './services.component.html',
//   styleUrl: './services.component.css'
// })
// export class Services implements AfterViewInit {

//   constructor(@Inject(PLATFORM_ID) private platformId: any) {}

//   ngAfterViewInit(): void {
//     if (isPlatformBrowser(this.platformId)) {
//       // We use a longer timeout to ensure Angular's 'fadeIn' and ' fadeInUp' 
//       // elements are fully injected into the DOM.
//       setTimeout(() => {
//         const windowVar = window as any;
//         if (windowVar.WOW) {
//           // Initialize WOW
//           const wow = new windowVar.WOW({
//             boxClass: 'wow',      // default
//             animateClass: 'animated', // default
//             offset: 0,          // default
//             mobile: true,       // default
//             live: false         // SET THIS TO FALSE for Angular
//           });
//           wow.init();
//           console.log("WOW.js initialized successfully");
//         } else {
//           console.warn("WOW.js not found on window object");
//         }
//       }, 500); 
//     }
//   }
// }