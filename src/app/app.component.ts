import { Component } from '@angular/core';
import { PushNotifications, Token, PushNotificationSchema, ActionPerformed } from '@capacitor/push-notifications';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [ CommonModule, IonicModule, ReactiveFormsModule, FormsModule],
})
export class AppComponent {
  token: string = '';

  constructor() {
    if (Capacitor.isNativePlatform()) {
      this.initPush();
    }
  }

  copiarToken() {
    navigator.clipboard.writeText(this.token);
    alert('Token copiado al portapapeles');
  }

  initPush() {
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      this.token = token.value;
      alert('Token: ' + token.value);
      console.log('Token:', token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      console.error('Registration error:', error);
    });

    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      alert('Notificación recibida: ' + JSON.stringify(notification));
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (action: ActionPerformed) => {
      alert('Acción de notificación: ' + JSON.stringify(action));
    });
  }
}
