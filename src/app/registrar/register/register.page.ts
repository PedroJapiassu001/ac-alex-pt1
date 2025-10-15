import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { LoginPageRoutingModule } from 'src/app/login/login/login-routing.module';
import { preserveWhitespacesDefault } from '@angular/compiler';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone:false,
})
export class RegisterPage{

  email = '';
  senha = '';

  constructor(  
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  async cadastrar() {
    const loading = await this.loadingCtrl.create({message: 'Cadastrando...'});
    await loading.present();

    try {
      await this.authService.register(this.email, this.senha);
      await loading.dismiss();
      this.presentToast('Cadastro realizado com sucesso!', 'success');
      this.router.navigateByUrl('/login');
    } catch (error: any) {
      await loading.dismiss();
      this.presentToast('Erro ao cadastrar:' + error.message, 'danger');
    }
  }


async presentToast(message: string, color: string = 'primary'){
  const toast = await this.toastCtrl.create({
    message,
    duration: 2000,
    color
  });
  toast.present();
}
}
