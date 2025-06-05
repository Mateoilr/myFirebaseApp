import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Toast } from '@capacitor/toast';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule],
})
export class HomePage {
foto: string | undefined;

  constructor(private authService: AuthService, private router: Router) {}

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
}
