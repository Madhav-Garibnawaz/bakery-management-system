import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-view-orders',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="card p-4 shadow-sm">
      <h2 class="mb-4">Customer Orders</h2>
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead class="table-warning">
            <tr>
              <th>Customer</th>
              <th>Phone</th>
              <th>Address</th>   <!-- ADD -->
              <th>Payment</th>   <!-- ADD -->
              <th>Items</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let order of orders">
              <td>{{ order.customer.name }}</td>
              <td>{{ order.customer.phone }}</td>

 <!-- ✅ NEW -->
  <td>
    {{ order.customer.address }},
    {{ order.customer.city }} - {{ order.customer.pincode }}
  </td>

  <!-- ✅ NEW -->
  <td>{{ order.customer.paymentMethod }}</td>

              <td>
                <div *ngFor="let item of order.items" class="small">
                  • {{ item.pname }} ({{ item.qty }})
                </div>
              </td>
              <td class="fw-bold text-success">₹{{ order.total }}</td>
              <td>{{ order.date | date:'short' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class ViewOrders implements OnInit {
  orders: any[] = [];
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.http.get('https://bakery-management-system-0yj2.onrender.com/api/order').subscribe((data: any) => {
      this.orders = data;
      this.cdr.detectChanges(); //here we have to manually trigger refresh
    });
  }
}