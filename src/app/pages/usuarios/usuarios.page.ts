import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { Storage, Storage as IonicStorage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class UsuariosPage implements OnInit {
  usuarios: any[] = [];
  tokenKey = 'token';

  private storageInstance: IonicStorage | undefined;

  constructor(private http: HttpClient, private storage: Storage, private navCtrl: NavController) {}

  async ngOnInit() {
    this.storageInstance = this.storage;
    if (this.storageInstance && this.storageInstance.create) {
      await this.storageInstance.create();
    }
    this.guardarToken();
    this.cargarUsuarios();
  }

async guardarToken() {
    await this.storage.set(this.tokenKey, 'token-fake-123');
    const token = await this.storage.get(this.tokenKey);
    console.log('Token almacenado:', token);
  }

  cargarUsuarios() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users').subscribe(
      data => {
        this.usuarios = data;
      },
      error => {
        console.error('Error al cargar usuarios:', error);
      }
    );
  }

  irAHome() {
    this.navCtrl.navigateRoot('/home'), {
      animated: true,
      animationDirection: 'back'
  }}

  iraAccesibilidad() {
    this.navCtrl.navigateRoot('/accesibilidad'),{
    animated: true,
    animationDirection: 'forward'
  }}
}
