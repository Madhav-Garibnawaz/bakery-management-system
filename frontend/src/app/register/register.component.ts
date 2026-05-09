// import { Component } from '@angular/core';
// import { RouterLink, RouterLinkActive } from '@angular/router';
// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [RouterLink, RouterLinkActive],
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class Register {

// }


// import { Component } from '@angular/core';
// import { RouterLink, RouterLinkActive } from '@angular/router';
// import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { HttpClient, HttpClientModule } from '@angular/common/http';

// @Component({
//   selector: 'app-regis',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterLink, RouterLinkActive], // HttpClientModule is required!
//   templateUrl: './regis.component.html',
//   styleUrls: ['./regis.component.css']
// })
// export class RegisComponent {

//   registerForm!: FormGroup;

//   constructor(private http: HttpClient) {
//     // initialize the form inside constructor to avoid TS2729
//     this.registerForm = new FormGroup({
//       fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
//       email: new FormControl('', [Validators.required, Validators.email]),
//       password: new FormControl('', [Validators.required, Validators.minLength(6)]),
//       confirmPassword: new FormControl('', Validators.required)
//     }, { validators: this.passwordMatchValidator });
//   }

//   // Validator for password match
//   passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
//     const password = control.get('password')?.value;
//     const confirm = control.get('confirmPassword')?.value;
//     return password === confirm ? null : { mismatch: true };
//   }

//   // Submit form and call backend
//   onSubmit() {
//     if (this.registerForm.valid) {
//       const apiUrl = 'http://localhost:3000/api/regis'; // your Node.js backend

//       this.http.post(apiUrl, this.registerForm.value).subscribe({
//         next: (res: any) => {
//           alert(res.message); // show success message
//           this.registerForm.reset(); // reset form after success
//         },
//         error: (err: any) => alert(err.error.message) // show backend error
//       });
//     }
//   }
// }



// import { Component } from '@angular/core';
// import { RouterLink, RouterLinkActive, Router } from '@angular/router'; // Added Router
// import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { HttpClient, HttpClientModule } from '@angular/common/http';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterLink, RouterLinkActive],
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class Register {

//   registerForm: FormGroup;

//   constructor(private http: HttpClient, private router: Router) {
//     this.registerForm = new FormGroup({
//       name: new FormControl('', [Validators.required, Validators.minLength(3)]),
//       email: new FormControl('', [Validators.required, Validators.email]),
//       phone: new FormControl('', [Validators.required]), // Added phone to match schema
//       password: new FormControl('', [Validators.required, Validators.minLength(6)]),
//       confirmPassword: new FormControl('', Validators.required)
//     }, { validators: this.passwordMatchValidator });
//   }

//   passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
//     const password = control.get('password')?.value;
//     const confirm = control.get('confirmPassword')?.value;
//     return password === confirm ? null : { mismatch: true };
//   }

//   onSubmit() {
//     if (this.registerForm.valid) {
//       // Use /api/register to match the endpoint we created in server.js
//       const apiUrl = 'http://localhost:3000/api/register'; 

//       this.http.post(apiUrl, this.registerForm.value).subscribe({
//         next: (res: any) => {
//           alert("Registration Successful!");
//           this.registerForm.reset();
//           this.router.navigate(['/login']); // Redirect to login
//         },
//         error: (err: any) => alert(err.error.message || "Registration failed")
//       });
//     } else {
//       alert("Please fill out the form correctly.");
//     }
//   }
// }



import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterLink, RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class Register {
  registerForm: FormGroup;

  constructor(private http: HttpClient, private router: Router) {
    this.registerForm = new FormGroup({
      // Changed 'fullName' to 'name' to match your Server Schema
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Z][a-zA-Z ]*$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]), // Added phone with pattern validation
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', Validators.required)
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      // Endpoint must match the new route in server.js
      const apiUrl = 'http://localhost:3000/api/register'; 

      this.http.post(apiUrl, this.registerForm.value).subscribe({
        next: (res: any) => {
          alert("Registration Successful!");
          this.registerForm.reset();
          this.router.navigate(['/login']);
        },
        error: (err: any) => {
          console.error(err);
          alert(err.error?.error || "Registration failed. Make sure the server API exists.");
        }
      });
    }
  }
}