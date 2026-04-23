import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './registration.html',
  styleUrls: ['./registration.css']
})
export class Registration implements OnInit {

  registerForm!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatch });
  }

  passwordMatch(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      const user = JSON.parse(localStorage.getItem('user') || '[]');
      const exists = user.find((u: any) => u.username === formData.username);
      if (exists) {
        alert('User already exists!');
        return;
      }

      user.push({
        name: formData.name,
        username: formData.username,
        password: formData.password,
        role: 'user'
      });

      localStorage.setItem('user', JSON.stringify(user));
      alert('Registration successful!');
      this.router.navigate(['/login']);

    } else {
      alert('Please fill all fields correctly.');
    }
  }
}