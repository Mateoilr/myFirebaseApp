import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signOut, UserCredential } from '@angular/fire/auth';

import { onAuthStateChanged } from '@angular/fire/auth';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
currentUser: User | null = null;

  constructor(private auth: Auth, private router: Router) {
    // Detecta cambios de autenticación y redirige
  onAuthStateChanged(this.auth, (user) => {
  this.currentUser = user;
   const currentUrl = this.router.url;

    // Si el usuario está autenticado y está en login o register, redirige a home
    if (user && (currentUrl === '/login' || currentUrl === '/register')) {
      this.router.navigate(['/home']);
    }
    // Si NO está autenticado y está en una ruta que NO sea login ni register, redirige a login
    if (
      !user &&
      currentUrl !== '/login' &&
      currentUrl !== '/register'
    ) {
      this.router.navigate(['/login']);
    }
});
  }

    // Obtener el usuario actual
  getUser(): User | null {
    return this.currentUser;
  }

  // Login con email y contraseña
  loginWithEmail(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Registro con email y contraseña
  registerWithEmail(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Login con Google
  loginWithGoogle(): Promise<UserCredential> {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  // Login con Facebook
  loginWithFacebook(): Promise<UserCredential> {
    return signInWithPopup(this.auth, new FacebookAuthProvider());
  }


  // Cerrar sesión
  logout(): Promise<void> {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('Email');
    return signOut(this.auth);

  }

}



