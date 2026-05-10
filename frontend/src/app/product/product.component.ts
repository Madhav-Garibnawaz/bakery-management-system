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
    this.http.get<any[]>('https://bakery-management-system-0yj2.onrender.com/api/product')
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