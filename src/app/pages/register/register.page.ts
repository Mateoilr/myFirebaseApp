import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegisterPage {
  registerForm: FormGroup;
  error = '';
  success = '';
  showPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private nav: NavController
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async registerEmail() {
  if (this.registerForm.invalid) {
    this.error = 'Completa todos los campos correctamente.';
    return;
  }
  const { email, password } = this.registerForm.value;
  try {
    await this.authService.registerWithEmail(email, password);
    localStorage.setItem('userEmail', email);
    this.success = 'Registro exitoso';
    this.error = '';
    setTimeout(() => this.router.navigate(['/home']), 1500); // <-- aquí debe ser /home
  } catch (err: any) {
    this.error = err.message;
    this.success = '';
    this.nav.navigateRoot('/home');
  }
}


  async registerGoogle() {
    try {
      await this.authService.loginWithGoogle();
      alert('Registro exitoso con Google');
    } catch (err: any) {
      this.error = err.message;
      this.nav.navigateRoot('/home');
    }
  }
  async registerFacebook() {
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
  goToLogin() {
  this.router.navigate(['/login']);
  this.nav.navigateRoot('/home');
}



}
