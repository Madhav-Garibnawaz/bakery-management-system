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
      categories: this.http.get<any[]>('https://bakery-management-system-0yj2.onrender.com/api/category'),
      products: this.http.get<any[]>('https://bakery-management-system-0yj2.onrender.com/api/product'),
      orders: this.http.get<any[]>('https://bakery-management-system-0yj2.onrender.com/api/order'),
      // users: this.http.get<any[]>('https://localhost:3000/api/users')
      users: this.http.get<any[]>('https://bakery-management-system-0yj2.onrender.com/api/users') // Added this line
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