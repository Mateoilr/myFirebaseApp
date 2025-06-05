import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
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
  showPassword = false;


    constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private nav: NavController) {
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
      this.nav.navigateRoot('/home');
    }
  }

  async loginGoogle() {
    try {
      await this.authService.loginWithGoogle();
      alert('Inicio de sesión correcto con Google');
      this.router.navigate(['/home']);
    } catch (err: any) {
      this.error = err.message;
      this.nav.navigateRoot('/home');
    }
  }

  async loginFacebook() {
    try {
      await this.authService.loginWithFacebook();
      this.router.navigate(['/home']);
    } catch (err: any) {
      this.error = err.message;
      this.nav.navigateRoot('/home');
    }
  }

togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}
  goToRegister() {
  this.router.navigate(['/register']);
  this.nav.navigateRoot('/home');

}

}
