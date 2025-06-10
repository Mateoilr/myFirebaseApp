import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-accesibilidad',
  templateUrl: './accesibilidad.page.html',
  styleUrls: ['./accesibilidad.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule,]
})
export class AccesibilidadPage {
  form: FormGroup;
  submitted = false;
  exito = false;


  constructor(private fb: FormBuilder, private navCtrl: NavController) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      alert('Formulario enviado correctamente');
      this.form.reset();
      this.submitted = false;
      this.exito = true;
      
    }

  }

  irAHome() {
    this.navCtrl.navigateRoot('/home');
  }


}
