import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage {
  error = '';
  success = '';
  loginForm: FormGroup;
  showPassword = false;



    constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private nav: NavController, private loadingCtrl: LoadingController) {
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
  const loading = await this.loadingCtrl.create({
    message: 'Iniciando sesión con Google...',
    spinner: 'crescent'
  });
  await loading.present();
  try {
    const user = await this.authService.loginWithGoogle();
    await loading.dismiss();
    if (user) {
      alert('Inicio de sesión correcto con Google');
      this.nav.navigateRoot(['/home']);
    } else {
      this.error = 'No se pudo iniciar sesión con Google.';
    }
  } catch (err: any) {
    await loading.dismiss();if (err.code === 'auth/popup-closed-by-user') {
      this.error = 'El proceso de inicio de sesión fue cancelado.';
    } else if (err.code === 'auth/user-cancelled' || err.code === 'auth/cancelled-popup-request') {
      this.error = 'El usuario canceló el inicio de sesión.';
    } else if (err.code === 'auth/idp-denied-access') {
      this.error = 'No se otorgaron los permisos necesarios para iniciar sesión.';
    } else {
      this.error = err.message;
    }

  }
}

async loginFacebook() {
  const loading = await this.loadingCtrl.create({
    message: 'Iniciando sesión con Facebook...',
    spinner: 'crescent'
  });
  await loading.present();
  try {
    const user = await this.authService.loginWithFacebook();
    await loading.dismiss();
    if (user) {
      this.nav.navigateRoot(['/home']);
    } else {
      this.error = 'No se pudo iniciar sesión con Facebook.';
    }
  } catch (err: any) {
    await loading.dismiss();
     if (err.code === 'auth/popup-closed-by-user') {
      this.error = 'El proceso de inicio de sesión fue cancelado.';
    } else if (err.code === 'auth/user-cancelled' || err.code === 'auth/cancelled-popup-request') {
      this.error = 'El usuario canceló el inicio de sesión.';
    } else if (err.code === 'auth/idp-denied-access') {
      this.error = 'No se otorgaron los permisos necesarios para iniciar sesión.';
    } else {
      this.error = err.message;
    }

  }
}

togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}
  goToRegister() {
  this.router.navigate(['/register']);
  this.nav.navigateRoot('/register');

}

}
