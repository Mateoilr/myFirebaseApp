import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


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

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
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
  }
}


  async registerGoogle() {
    try {
      await this.authService.loginWithGoogle();
      alert('Registro exitoso con Google');
    } catch (err: any) {
      this.error = err.message;
    }
  }

  goToLogin() {
  this.router.navigate(['/login']);
}


}
