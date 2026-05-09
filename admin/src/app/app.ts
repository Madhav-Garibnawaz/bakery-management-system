// import { Component } from '@angular/core';
// import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule, RouterLink, RouterOutlet, RouterLinkActive],
//   template: `
//     <div class="dashboard">

//       <!-- Sidebar -->
//       <aside class="sidebar">
//         <h2>Admin Panel</h2>

//         <nav>
//           <a routerLink="/login" routerLinkActive="active">Login</a>
//           <a routerLink="/register" routerLinkActive="active">Register</a>

//           <!-- CATEGORY -->
//           <div class="menu-group">
//             <div class="menu-title" (click)="toggleCategory()">
//               📂 Category
//             </div>

//             <div *ngIf="showCategory">
//               <a routerLink="/category/add" class="submenu">➕ Add Category</a>
//               <a routerLink="/category/view" class="submenu">📄 View Category</a>
//             </div>
//           </div>

//           <!-- PRODUCT -->
//           <div class="menu-group">
//             <div class="menu-title" (click)="toggleProduct()">
//               📦 Product
//             </div>

//             <div *ngIf="showProduct">
//               <a routerLink="/product/add" class="submenu">➕ Add Product</a>
//               <a routerLink="/product/view" class="submenu">📄 View Product</a>
//             </div>
//           </div>

//         </nav>
//       </aside>

//       <!-- Main Content -->
//       <main class="main-content">
//         <header class="topbar">
//           <h1>Dashboard</h1>
//         </header>

//         <section class="content">
//           <router-outlet></router-outlet>
//         </section>
//       </main>

//     </div>
//   `,
//   styles: [`
//     .dashboard {
//       display: flex;
//       height: 100vh;
//       font-family: Arial, sans-serif;
//     }

//     .sidebar {
//       width: 240px;
//       background: #1f2937;
//       color: white;
//       padding: 20px;
//     }

//     .sidebar h2 {
//       margin-bottom: 20px;
//     }

//     nav a {
//       display: block;
//       padding: 10px;
//       margin-bottom: 6px;
//       color: #cbd5e1;
//       text-decoration: none;
//       border-radius: 5px;
//     }

//     nav a:hover {
//       background: #3b82f6;
//       color: white;
//     }

//     .menu-group {
//       margin-top: 15px;
//     }

//     .menu-title {
//       cursor: pointer;
//       font-weight: bold;
//       padding: 10px;
//       border-radius: 5px;
//       background: #111827;
//     }

//     .menu-title:hover {
//       background: #374151;
//     }

//     .submenu {
//       padding-left: 30px !important;
//       font-size: 0.95rem;
//     }

//     .main-content {
//       flex: 1;
//       background: #f1f5f9;
//       display: flex;
//       flex-direction: column;
//     }

//     .topbar {
//       background: white;
//       padding: 15px;
//       box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//     }

//     .content {
//       padding: 20px;
//       flex: 1;
//       overflow-y: auto;
//     }
//   `]
// })
// export class App {

//   showCategory = false;
//   showProduct = false;

//   toggleCategory() {
//     this.showCategory = !this.showCategory;
//     this.showProduct = false; // close other
//   }

//   toggleProduct() {
//     this.showProduct = !this.showProduct;
//     this.showCategory = false; // close other
//   }
// }


// ===============================================================================
// Above is mam's old code and below is 1st new code


// import { Component } from '@angular/core';
// import { RouterLink, RouterOutlet, RouterLinkActive, Router } from '@angular/router'; // Added Router
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule, RouterLink, RouterOutlet, RouterLinkActive],
//   template: `
//     <div [class.dashboard]="!isAuthPage()">

//       <aside class="sidebar" *ngIf="!isAuthPage()">
//         <h2>Admin Panel</h2>
//         <nav>
//           <div class="menu-group">
//             <div class="menu-title" (click)="toggleCategory()">📂 Category</div>
//             <div *ngIf="showCategory">
//               <a routerLink="/category/add" routerLinkActive="active" class="submenu">➕ Add Category</a>
//               <a routerLink="/category/view" routerLinkActive="active" class="submenu">📄 View Category</a>
//             </div>
//           </div>

//           <div class="menu-group">
//             <div class="menu-title" (click)="toggleProduct()">📦 Product</div>
//             <div *ngIf="showProduct">
//               <a routerLink="/product/add" routerLinkActive="active" class="submenu">➕ Add Product</a>
//               <a routerLink="/product/view" routerLinkActive="active" class="submenu">📄 View Product</a>
//             </div>
//           </div>

//           <a (click)="logout()" style="cursor:pointer; margin-top: 20px;" class="text-danger">🚪 Logout</a>
//         </nav>
//       </aside>

//       <main [class.main-content]="!isAuthPage()" [class.auth-container]="isAuthPage()">
//         <header class="topbar" *ngIf="!isAuthPage()">
//           <h1>Dashboard</h1>
//         </header>

//         <section [class.content]="!isAuthPage()">
//           <router-outlet></router-outlet>
//         </section>
//       </main>

//     </div>
//   `,
//   styles: [`
//     .dashboard { display: flex; height: 100vh; font-family: Arial, sans-serif; }
//     .sidebar { width: 240px; background: #1f2937; color: white; padding: 20px; flex-shrink: 0; }
    
//     /* Style for when you are on Login/Register */
//     .auth-container {
//       width: 100%;
//       height: 100vh;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       background: #f1f5f9;
//     }

//     /* Keep your existing styles below */
//     nav a { display: block; padding: 10px; margin-bottom: 6px; color: #cbd5e1; text-decoration: none; border-radius: 5px; }
//     nav a.active { background: #3b82f6; color: white; }
//     .menu-group { margin-top: 15px; }
//     .menu-title { cursor: pointer; font-weight: bold; padding: 10px; border-radius: 5px; background: #111827; }
//     .submenu { padding-left: 30px !important; font-size: 0.95rem; }
//     .main-content { flex: 1; background: #f1f5f9; display: flex; flex-direction: column; }
//     .topbar { background: white; padding: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
//     .content { padding: 20px; flex: 1; overflow-y: auto; }
//   `]
// })
// export class App {
//   showCategory = false;
//   showProduct = false;

//   constructor(private router: Router) {}

//   // This helper function checks if we are on the login or register page
//   isAuthPage(): boolean {
//     const url = this.router.url;
//     return url === '/login' || url === '/register' || url === '/';
//   }

//   toggleCategory() {
//     this.showCategory = !this.showCategory;
//     this.showProduct = false;
//   }

//   toggleProduct() {
//     this.showProduct = !this.showProduct;
//     this.showCategory = false;
//   }

//   logout() {
//     // Logic to clear session/token goes here
//     this.router.navigate(['/login']);
//   }
// }



// =====================================================
// new 2nd app.ts code from gemini


import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, RouterLinkActive],
  template: `
    <div [class.dashboard]="!isAuthPage()">
      
      <aside class="sidebar" *ngIf="!isAuthPage()">
        <h2>Admin Panel</h2>
        <nav>
          <a routerLink="/dashboard" routerLinkActive="active" (click)="closeAll()" class="menu-item">
            🏠 Dashboard
          </a>
          <div class="menu-group">
            <div class="menu-title" (click)="toggleCategory()">📂 Category</div>
            <div *ngIf="showCategory">
              <a routerLink="/category/add" routerLinkActive="active" class="submenu">➕ Add Category</a>
              <a routerLink="/category/view" routerLinkActive="active" class="submenu">📄 View Category</a>
            </div>
          </div>

          <div class="menu-group">
            <div class="menu-title" (click)="toggleProduct()">📦 Product</div>
            <div *ngIf="showProduct">
              <a routerLink="/product/add" routerLinkActive="active" class="submenu">➕ Add Product</a>
              <a routerLink="/product/view" routerLinkActive="active" class="submenu">📄 View Product</a>
            </div>
          </div>

          <a routerLink="/orders" routerLinkActive="active" (click)="closeAll()" class="menu-item">
            📋 View Orders
          </a>

          <a routerLink="/users" routerLinkActive="active" (click)="closeAll()" class="menu-item">
            👥 View Users
          </a>

          <a (click)="logout()" class="text-danger mt-4 d-block" style="cursor:pointer">🚪 Logout</a>
        </nav>
      </aside>

      <main [class.main-content]="!isAuthPage()">
        <header class="topbar" *ngIf="!isAuthPage()">
          <h1>Dashboard</h1>
        </header>

        <section [class.content]="!isAuthPage()">
          <router-outlet></router-outlet>
        </section>
      </main>
    </div>
  `,
  // styles: [`
  //   /* Dashboard layout (Flexbox) only applies when sidebar is present */
  //   .dashboard { display: flex; height: 100vh; }
    
  //   .sidebar { width: 240px; background: #1f2937; color: white; padding: 20px; flex-shrink: 0; }
  //   .main-content { flex: 1; background: #f1f5f9; display: flex; flex-direction: column; overflow: hidden; }
    
  //   /* Styles for sidebar links and active state */
  //   nav a { display: block; padding: 10px; margin-bottom: 6px; color: #cbd5e1; text-decoration: none; border-radius: 5px; }
  //   nav a.active { background: #3b82f6; color: white; }
    
  //   .menu-group { margin-top: 15px; }
  //   .menu-title { cursor: pointer; font-weight: bold; padding: 10px; border-radius: 5px; background: #111827; }
  //   .submenu { padding-left: 30px !important; font-size: 0.95rem; }
    
  //   .topbar { background: white; padding: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
  //   .content { padding: 20px; flex: 1; overflow-y: auto; }

  //   /* When login page is active, router-outlet fills the whole screen */
  // `]
  styles: [`
    .dashboard { display: flex; height: 100vh; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
    
    .sidebar { width: 240px; background: #1f2937; color: white; padding: 20px; flex-shrink: 0; }
    .main-content { flex: 1; background: #f1f5f9; display: flex; flex-direction: column; overflow: hidden; }
    
    /* Navigation Link Styles */
    nav a { display: block; padding: 10px; margin-bottom: 6px; color: #cbd5e1; text-decoration: none; border-radius: 5px; transition: 0.3s; }
    nav a:hover { background: #374151; color: white; }
    nav a.active { background: #3b82f6; color: white; }

    /* Dashboard Link specific style */
    .menu-item { font-weight: bold; margin-bottom: 15px; background: #111827; }
    
    .menu-group { margin-top: 15px; }
    .menu-title { cursor: pointer; font-weight: bold; padding: 10px; border-radius: 5px; background: #111827; margin-bottom: 5px; }
    .menu-title:hover { background: #374151; }
    
    .submenu { padding-left: 30px !important; font-size: 0.9rem; color: #94a3b8; }
    
    .topbar { background: white; padding: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .content { padding: 20px; flex: 1; overflow-y: auto; }

    .logout-btn:hover { background: rgba(220, 38, 38, 0.1); }
    .text-danger { color: #ef4444 !important; }
  `]
})
export class App {
  showCategory = false;
  showProduct = false;

  constructor(private router: Router) {}

  // Added this method to fix the error in your template
  closeAll() {
    this.showCategory = false;
    this.showProduct = false;
  }

  isAuthPage(): boolean {
    const url = this.router.url;
    // Check if current URL is login, register, or root
    return url === '/login' || url === '/register' || url === '/';
  }

  toggleCategory() { this.showCategory = !this.showCategory; this.showProduct = false; }
  toggleProduct() { this.showProduct = !this.showProduct; this.showCategory = false; }

  logout() {
    this.router.navigate(['/login']);
  }
}