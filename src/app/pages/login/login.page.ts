import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, ReactiveFormsModule]
})
export class LoginPage {
  error = '';
  success = '';
  loginForm: FormGroup;


    constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async loginEmail() {
    if (this.loginForm.invalid) {
      this.error = 'Completa todos los campos correctamente.';
      return;
    }
    const { email, password } = this.loginForm.value;
    try {
      await this.authService.loginWithEmail(email, password);
      localStorage.setItem('Email', email);
      alert('Inicio de sesión correcto');
      this.router.navigate(['/home']);
    } catch (err: any) {
      this.error = 'Credenciales incorrectas.';
      localStorage.removeItem('userEmail');
    }
  }

  async loginGoogle() {
    try {
      await this.authService.loginWithGoogle();
      alert('Inicio de sesión correcto con Google');
      this.router.navigate(['/home']);
    } catch (err: any) {
      this.error = err.message;
    }
  }
  showPassword = false;

togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}
  goToRegister() {
  this.router.navigate(['/register']);
}}
