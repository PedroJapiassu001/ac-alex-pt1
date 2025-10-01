import { Component, OnInit } from '@angular/core';
import { CuidadoresService, Cuidador } from '../services/cuidadores.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-cuidadores',
  templateUrl: './cuidadores.page.html',
  styleUrls: ['./cuidadores.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  standalone: true
})
export class CuidadoresPage implements OnInit {
  cuidadores: Cuidador[] = [];

  novoCuidador: Cuidador = {
    nomeCuidador: '',
    cell: '',
    tempoExperiencia: 0,
    conhecimentos: ''
  };

  isEditing: boolean = false;

  constructor(private cuidadoresService: CuidadoresService) { }

  ngOnInit() {
    this.cuidadoresService.getCuidadores().subscribe(res => {
      this.cuidadores = res;
    });
  }

  adicionarOuAtualizarCuidador() {
    if (this.isEditing) {
      this.cuidadoresService.updateCuidador(this.novoCuidador).then(() => {
        console.log('Cuidador atualizado com sucesso!');
        this.limparFormulario();
      });
    } else {
      this.cuidadoresService.addCuidador(this.novoCuidador).then(() => {
        console.log('Cuidador adicionado com sucesso!');
        this.limparFormulario();
      });
    }
  }

  editarCuidador(cuidador: Cuidador) {
    this.novoCuidador = { ...cuidador };
    this.isEditing = true;
  }

  deletarCuidador(id: string) {
    this.cuidadoresService.deleteCuidador(id).then(() => {
      console.log('Cuidador deletado com sucesso!');
    });
  }

  limparFormulario() {
    this.novoCuidador = {
      nomeCuidador: '',
      cell: '',
      tempoExperiencia: 0,
      conhecimentos: ''
    };
    this.isEditing = false;
  }
}