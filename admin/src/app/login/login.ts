import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Added for extra utility
import { Router, RouterModule } from '@angular/router'; // To support routerLink
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',    // Point to your HTML file
  styleUrls: ['./login.css']      // Point to your CSS file
})
export class Login implements AfterViewInit { // Implement AfterViewInit to trigger change detection after the view is initialized
  email = '';
  password = '';

  // I had to add this constructor to trigger change detection after login, otherwise the alert would not show up immediately
  constructor(private cdr: ChangeDetectorRef, private router: Router) {}

  // // This function runs the moment the HTML is visible
  ngAfterViewInit() {
    this.cdr.detectChanges(); // This forces the button to "wake up" and show its colors immediately
  }


  login() {
  // 1. Basic validation
  if (!this.email || !this.password) {
    alert('Please enter both email and password');
    return;
  }

  // 2. Firebase Auth Call
  signInWithEmailAndPassword(getAuth(), this.email, this.password)
    .then(() => {
      // ✅ SUCCESS: This code runs ONLY if the password is correct
      alert('Admin Login Success');
      
      // 🚀 Redirect to the dashboard
      this.router.navigate(['/dashboard']); 
    })
    .catch(err => {
      // ❌ FAILURE: Runs if password is wrong or user doesn't exist
      alert(err.message);
    });
}
}