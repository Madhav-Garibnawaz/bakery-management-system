import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register implements AfterViewInit {

  name = '';
  phone = '';
  email = '';
  password = '';
  confirmPassword = ''; // Added to match the UI

  // constructor(private cdr: ChangeDetectorRef) {}
  constructor(private cdr: ChangeDetectorRef, private router: Router) {}

  ngAfterViewInit() {
    this.cdr.detectChanges(); // Ensures styles apply immediately
  }

  async register() {
    
    if (!this.name || !this.email || !this.password || !this.phone) {
      alert("Please fill in all fields.");
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // 1️⃣ Create user in Firebase Auth
      const result = await createUserWithEmailAndPassword(
        getAuth(),
        this.email,
        this.password
      );

      // 2️⃣ Get logged-in user ID
      const uid = result.user.uid;

      // 3️⃣ Save extra details in Firestore
      await setDoc(doc(getFirestore(), 'users', uid), {
        name: this.name,
        phone: this.phone,
        email: this.email,
        role: 'admin', // Good practice to label admin users
        createdAt: new Date()
      });

      alert('Admin Registration Successful');
      this.router.navigate(['/login']);

    } catch (error: any) {
      alert(error.message);
    }
  }
}