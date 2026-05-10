// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-checkout',
//   imports: [],
//   templateUrl: './checkout.component.html',
//   styleUrl: './checkout.component.css',
// })
// export class Checkout {

// }


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './checkout.component.html'
})
export class Checkout implements OnInit {

  cart: any[] = [];
  total: number = 0;

  formData = {
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'Cash on Delivery'
  };

  constructor(private http: HttpClient,
              private router: Router) {}

  ngOnInit() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
      this.total = this.cart.reduce(
        (sum, item) => sum + (item.price * item.qty),
        0
      );
    }
  }

  placeOrder() {

    if (!this.formData.name || !this.formData.phone || !this.formData.address) {
      alert("Please fill all required details!");
      return;
    }

    const orderData = {
      items: this.cart,
      customer: this.formData,
      total: this.total,
      date: new Date()
    };

    this.http.post('https://bakery-management-system-0yj2.onrender.com/api/order', orderData)
      .subscribe(() => {

        localStorage.removeItem('cart');
        alert("Order Placed Successfully 🎉");
        this.router.navigate(['/']);

      });
  }
}