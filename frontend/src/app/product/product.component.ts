// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HttpClient, HttpClientModule } from '@angular/common/http';

// @Component({
//   selector: 'app-product',
//   standalone: true,
//   imports: [CommonModule, HttpClientModule],
//   templateUrl: './product.component.html',
//   styleUrl: './product.component.css',
// })
// export class Product implements OnInit {
//   products: any[] = [];

//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     this.http.get<any[]>('http://localhost:3000/api/product')
//       .subscribe(data => this.products = data);
//   }
// }



// @Component({
//   selector: 'app-product-list',
//   standalone: true,
//   imports: [CommonModule, HttpClientModule],
//   templateUrl: './view-product.component.html'
// })
// export class ViewProductComponent implements OnInit {

//   products: any[] = [];

//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     this.http.get<any[]>('http://localhost:3000/api/product')
//       .subscribe(data => this.products = data);
//   }
// }


// import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Import ChangeDetectorRef
// import { CommonModule } from '@angular/common';
// import { HttpClient, HttpClientModule } from '@angular/common/http';

// @Component({
//   selector: 'app-product',
//   standalone: true,
//   imports: [CommonModule, HttpClientModule],
//   templateUrl: './product.component.html',
//   styleUrl: './product.component.css',
// })
// export class Product implements OnInit {
//   products: any[] = [];

//   // 2. Inject ChangeDetectorRef into the constructor
//   constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

//   ngOnInit() {
//     this.http.get<any[]>('http://localhost:3000/api/product')
//       .subscribe({
//         next: (data) => {
//           this.products = data;
          
//           // 3. THE MAGIC LINE: Tell Angular to redraw the HTML immediately
//           this.cdr.detectChanges(); 
//         },
//         error: (err) => {
//           console.error('Error fetching products:', err);
//         }
//       });
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Component({
//   selector: 'app-product',
//   standalone: true,
//   imports: [CommonModule, HttpClientModule],
//   templateUrl: './product.component.html',
//   styleUrl: './product.component.css',
// })
// export class Product implements OnInit {
//   // products$: any; // Change this to an Observable
//   products$: Observable<any[]> | undefined;

//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     // Just assign the request, don't manually subscribe
//     this.products$ = this.http.get<any[]>('http://localhost:3000/api/product');
//   }
// }


// =========================================================================
// changed on 26 feb and last code is of 27 feb

// import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // Added ChangeDetectorRef
// import { CommonModule } from '@angular/common';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { RouterModule, Router, ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-product', // Matches your selector
//   standalone: true,
//   imports: [CommonModule, RouterModule, HttpClientModule, ActivatedRoute],
//   templateUrl: './product.component.html',
//   styleUrls: ['./product.component.css']
// })
// export class Product implements OnInit {

//   products: any[] = [];
//   cart: any[] = [];
//   showCart: boolean = false;

//   constructor(
//     private http: HttpClient,
//     private router: Router,
//     private cdr: ChangeDetectorRef // Inject this to fix the "blank page" bug
//   ) {}

//   ngOnInit() {
//     // Load products from backend
//     this.http.get<any[]>('http://localhost:3000/api/product')
//       .subscribe(data => {
//         this.products = data;
//         this.cdr.detectChanges(); // ✅ This forces the UI to show data immediately
//       });

//     // Load cart from localStorage
//     const storedCart = localStorage.getItem('cart');
//     if (storedCart) {
//       this.cart = JSON.parse(storedCart);
//     }
//   }

//   addToCart(product: any) {
//     const existing = this.cart.find(item => item.pname === product.pname);
//     if (existing) {
//       existing.qty += 1;
//     } else {
//       this.cart.push({
//         pname: product.pname,
//         price: product.price,
//         qty: 1
//       });
//     }
//     this.saveCart();
//     this.showCart = true;
//   }

//   increaseQty(item: any) {
//     item.qty++;
//     this.saveCart();
//   }

//   decreaseQty(item: any) {
//     if (item.qty > 1) {
//       item.qty--;
//     } else {
//       this.removeItem(item);
//     }
//     this.saveCart();
//   }

//   removeItem(item: any) {
//     this.cart = this.cart.filter(p => p !== item);
//     this.saveCart();
//   }

//   getTotal(): number {
//     return this.cart.reduce((sum, item) => sum + (Number(item.price) * item.qty), 0);
//   }

//   getCartCount(): number {
//     return this.cart.reduce((count, item) => count + item.qty, 0);
//   }

//   saveCart() {
//     localStorage.setItem('cart', JSON.stringify(this.cart));
//   }

//   toggleCart() {
//     this.showCart = !this.showCart;
//   }

//   goToCheckout() {
//     this.showCart = false;
//     this.router.navigate(['/checkout']);
//   }
// }


import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule], // ActivatedRoute is a service, removed from here
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class Product implements OnInit {
  allProducts: any[] = [];      // Master copy from Database
  filteredProducts: any[] = []; // List shown in the UI
  cart: any[] = [];
  showCart: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    // 1. Load products from backend
    this.http.get<any[]>('http://localhost:3000/api/product')
      .subscribe(data => {
        this.allProducts = data;

        // 2. Watch for Category changes in the URL (?category=Name)
        this.route.queryParamMap.subscribe(params => {
          const catFilter = params.get('category');

          if (catFilter) {
            // Filter based on the category chosen
            this.filteredProducts = this.allProducts.filter(p => p.category === catFilter);
          } else {
            // No filter (Show All)
            this.filteredProducts = this.allProducts;
          }
          
          this.cdr.detectChanges(); // Refresh UI
        });
      });

    // 3. Load cart from localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
  }

  // --- CART LOGIC ---

  addToCart(product: any) {
    const existing = this.cart.find(item => item.pname === product.pname);
    if (existing) {
      existing.qty += 1;
    } else {
      this.cart.push({
        pname: product.pname,
        price: product.price,
        qty: 1
      });
    }
    this.saveCart();
    this.showCart = true;
  }

  increaseQty(item: any) {
    item.qty++;
    this.saveCart();
  }

  decreaseQty(item: any) {
    if (item.qty > 1) {
      item.qty--;
    } else {
      this.removeItem(item);
    }
    this.saveCart();
  }

  removeItem(item: any) {
    this.cart = this.cart.filter(p => p !== item);
    this.saveCart();
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + (Number(item.price) * item.qty), 0);
  }

  getCartCount(): number {
    return this.cart.reduce((count, item) => count + item.qty, 0);
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }

  goToCheckout() {
    this.showCart = false;
    this.router.navigate(['/checkout']);
  }
}