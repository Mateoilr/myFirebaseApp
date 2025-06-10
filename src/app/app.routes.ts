import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('src/app/home/home.page').then(m => m.HomePage),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'users',
    loadComponent: () => import('./pages/usuarios/usuarios.page').then( m => m.UsuariosPage),

  },
  {
    path: 'accesibilidad',
    loadComponent: () => import('./pages/accesibilidad/accesibilidad.page').then(m => m.AccesibilidadPage),
    canActivate: [authGuard]
  },
];

