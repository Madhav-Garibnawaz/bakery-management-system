// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-dashboard',
//   imports: [],
//   templateUrl: './dashboard.html',
//   styleUrl: './dashboard.css',
// })
// export class Dashboard {

// }


// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [CommonModule],
//   template: `
//     <div class="row mt-4">
//       <div class="col-md-4">
//         <div class="card bg-primary text-white p-4 shadow-sm">
//           <h3>Welcome, Admin!</h3>
//           <p>Use the sidebar to manage your bakery inventory.</p>
//         </div>
//       </div>
//     </div>
//   `
// })
// export class DashboardComponent {}



// =========================================================
// New 3rd code

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HttpClient, HttpClientModule } from '@angular/common/http';

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [CommonModule, HttpClientModule],
//   template: `
//     <div class="container-fluid pt-4">
//       <h2 class="mb-4 fw-bold">System Overview</h2>
      
//       <div class="row g-4">
//         <div class="col-12 col-sm-6 col-xl-3">
//           <div class="card border-0 shadow-sm h-100 stat-card" style="border-left: 5px solid #4e73df !important;">
//             <div class="card-body">
//               <div class="d-flex justify-content-between align-items-center">
//                 <div>
//                   <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Categories</div>
//                   <div class="h3 mb-0 font-weight-bold text-gray-800">{{stats.categories}}</div>
//                 </div>
//                 <div class="icon-box bg-light-primary text-primary">📂</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div class="col-12 col-sm-6 col-xl-3">
//           <div class="card border-0 shadow-sm h-100 stat-card" style="border-left: 5px solid #1cc88a !important;">
//             <div class="card-body">
//               <div class="d-flex justify-content-between align-items-center">
//                 <div>
//                   <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Products</div>
//                   <div class="h3 mb-0 font-weight-bold text-gray-800">{{stats.products}}</div>
//                 </div>
//                 <div class="icon-box bg-light-success text-success">📦</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div class="col-12 col-sm-6 col-xl-3">
//           <div class="card border-0 shadow-sm h-100 stat-card" style="border-left: 5px solid #36b9cc !important;">
//             <div class="card-body">
//               <div class="d-flex justify-content-between align-items-center">
//                 <div>
//                   <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Users</div>
//                   <div class="h3 mb-0 font-weight-bold text-gray-800">{{stats.users}}</div>
//                 </div>
//                 <div class="icon-box bg-light-info text-info">👥</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div class="col-12 col-sm-6 col-xl-3">
//           <div class="card border-0 shadow-sm h-100 stat-card" style="border-left: 5px solid #f6c23e !important;">
//             <div class="card-body">
//               <div class="d-flex justify-content-between align-items-center">
//                 <div>
//                   <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">Total Orders</div>
//                   <div class="h3 mb-0 font-weight-bold text-gray-800">{{stats.orders}}</div>
//                 </div>
//                 <div class="icon-box bg-light-warning text-warning">💰</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div class="mt-5 p-5 bg-white rounded shadow-sm">
//         <h3 class="fw-light">Hello, <span class="fw-bold">Bakery Admin</span>!</h3>
//         <p class="text-muted">You have <strong>{{stats.orders}}</strong> pending orders to check today.</p>
//         <button class="btn btn-primary mt-2">View Recent Orders</button>
//       </div>
//     </div>
//   `,
//   styles: [`
//     .stat-card { transition: transform 0.2s; }
//     .stat-card:hover { transform: translateY(-5px); }
//     .text-xs { font-size: .75rem; }
//     .icon-box {
//       width: 48px;
//       height: 48px;
//       border-radius: 50%;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-size: 1.5rem;
//     }
//     .bg-light-primary { background-color: #eef2ff; }
//     .bg-light-success { background-color: #e6fffa; }
//     .bg-light-info { background-color: #e0f7fa; }
//     .bg-light-warning { background-color: #fff9db; }
//   `]
// })
// export class DashboardComponent implements OnInit {
//   stats = {
//     categories: 0,
//     products: 0,
//     users: 0,
//     orders: 0
//   };

//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     this.loadStats();
//   }

//   loadStats() {
//     // You can later create a single API endpoint in server.js to return all these counts
//     // For now, let's fetch products and categories as we already have those APIs
//     this.http.get<any[]>('http://localhost:3000/api/product').subscribe(res => this.stats.products = res.length);
//     this.http.get<any[]>('http://localhost:3000/api/category').subscribe(res => this.stats.categories = res.length);
    
//     // We will update Users and Orders once we build those schemas in server.js!
//     this.stats.users = 1; // Placeholder
//     this.stats.orders = 5; // Placeholder
//   }
// }


// =======================================
// latest 4th code

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HttpClient, HttpClientModule } from '@angular/common/http';

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [CommonModule, HttpClientModule],
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent implements OnInit {
//   stats = {
//     categories: 0,
//     products: 0,
//     users: 1, // Static for now or fetch from DB
//     orders: 0
//   };

//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     this.loadAllStats();
//   }

//   loadAllStats() {
//     // Replace these URLs with your actual backend endpoints
//     this.http.get<any[]>('http://localhost:3000/api/category').subscribe({
//       next: (res) => this.stats.categories = res.length,
//       error: (err) => console.error('Category load failed', err)
//     });

//     this.http.get<any[]>('http://localhost:3000/api/product').subscribe({
//       next: (res) => this.stats.products = res.length,
//       error: (err) => console.error('Product load failed', err)
//     });

//     // Fetching Orders (based on your MongoDB screenshot)
//     this.http.get<any[]>('http://localhost:3000/api/orders').subscribe({
//       next: (res) => this.stats.orders = res.length,
//       error: (err) => console.error('Orders load failed', err)
//     });
//   }
// }




// ====================================
// 5th code

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { forkJoin } from 'rxjs'; // Import this to handle multiple requests

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [CommonModule, HttpClientModule],
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent implements OnInit {
//   stats = {
//     categories: 0,
//     products: 0,
//     users: 1, // Static placeholder
//     orders: 0
//   };

//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     this.loadData();
//   }

//   loadData() {
//     // We group all your existing working APIs together
//     forkJoin({
//       categories: this.http.get<any[]>('http://localhost:3000/api/category'),
//       products: this.http.get<any[]>('http://localhost:3000/api/product'),
//       orders: this.http.get<any[]>('http://localhost:3000/api/order')
//     }).subscribe({
//       next: (results) => {
//         // results contains the data from all 3 APIs
//         this.stats.categories = results.categories.length;
//         this.stats.products = results.products.length;
//         this.stats.orders = results.orders.length;
//         console.log('All counts loaded successfully:', this.stats);
//       },
//       error: (err) => {
//         console.error('Error loading dashboard data:', err);
//       }
//     });
//   }
// }





// =============================================
// 6th code

import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Added ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats = {
    categories: 0,
    products: 0,
    users: 0,
    orders: 0
  };

  // 2. Inject ChangeDetectorRef in the constructor
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    forkJoin({
      categories: this.http.get<any[]>('http://localhost:3000/api/category'),
      products: this.http.get<any[]>('http://localhost:3000/api/product'),
      orders: this.http.get<any[]>('http://localhost:3000/api/order'),
      // users: this.http.get<any[]>('https://localhost:3000/api/users')
      users: this.http.get<any[]>('http://localhost:3000/api/users') // Added this line
    }).subscribe({
      next: (results) => {
        this.stats.categories = results.categories.length;
        this.stats.products = results.products.length;
        this.stats.orders = results.orders.length;
        this.stats.users = results.users.length;
        
        console.log('Data loaded:', this.stats);

        // 3. THIS IS THE KEY: Force Angular to update the HTML numbers
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error(err)
    });
  }
}