import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Toast } from '@capacitor/toast';
import { CommonModule } from '@angular/common';
import { Network } from '@capacitor/network';
import { NavController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule],
})
export class HomePage {
foto: string | undefined;
isOnline: boolean = true;
networkListener: any;


  constructor(private authService: AuthService, private router: Router, private nav:NavController,   private cdr: ChangeDetectorRef) {}


 ngOnInit() {
    this.checkNetworkStatus();
    this.networkListener = Network.addListener('networkStatusChange', (status) => {
      this.isOnline = status.connected;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.networkListener) {
      this.networkListener.remove();
    }
  }

  async checkNetworkStatus() {
    const status = await Network.getStatus();
    this.isOnline = status.connected;
  }

  async logout() {
    await this.authService.logout();
    alert('Cierre de sesión exitoso');
    this.router.navigate(['/login']);
  }


  async tomarFoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
    });
    this.foto = image.dataUrl;
    this.mostrarToast('¡Foto tomada exitosamente!');
  }

  async mostrarToast(mensaje: string) {
    await Toast.show({
      text: mensaje,
      duration: 'short'
    });
  }

  login() {
  // ...tu lógica de login...
  this.nav.navigateRoot('/home'); // Esto limpia el historial
}
}
