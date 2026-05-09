// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-cart',
//   imports: [],
//   templateUrl: './cart.component.html',
//   styleUrl: './cart.component.css',
// })
// export class Cart {

// }


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
@Component({
  selector: 'app-cart',
  standalone: true,
    imports: [CommonModule, RouterModule], 
  templateUrl: './cart.component.html'
})
export class Cart implements OnInit {

  cart: any[] = [];

  ngOnInit() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
  }

  removeItem(index: number) {
    this.cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + Number(item.price), 0);
  }

  clearCart() {
    this.cart = [];
    localStorage.removeItem('cart');
  }
}