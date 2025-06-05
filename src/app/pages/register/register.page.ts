import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';


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
    private nav: NavController,
    private loadingCtrl: LoadingController
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
  const loading = await this.loadingCtrl.create({
    message: 'Iniciando sesión con Google...',
    spinner: 'crescent'
  });
  await loading.present();
  try {
    const user = await this.authService.loginWithGoogle();
    await loading.dismiss();
    if (user) {
      this.nav.navigateRoot(['/home']);
    } else {
      this.error = 'No se pudo iniciar sesión con Google.';
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
  async registerFacebook() {
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
  goToLogin() {
  this.router.navigate(['/login']);
  this.nav.navigateRoot('/login');
}

}
