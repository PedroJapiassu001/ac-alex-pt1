import { Component, OnInit } from '@angular/core';
import { PetsService, Pet } from '../services/pets.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.page.html',
  styleUrls: ['./pets.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  standalone: true
})
export class PetsPage implements OnInit {
  pets: Pet[] = [];

  novoPet: Pet = {
    nome: '',
    categoria: '',
    raca: '',
    idadePet: 0,
    descricao: ''
  };

  isEditing: boolean = false;

  constructor(private petsService: PetsService) { }

  ngOnInit() {
    this.petsService.getPets().subscribe(res => {
      this.pets = res;
    });
  }

  adicionarOuAtualizarPet() {
    if (this.isEditing) {
      this.petsService.updatePet(this.novoPet).then(() => {
        console.log('Pet atualizado com sucesso!');
        this.limparFormulario();
      });
    } else {
      this.petsService.addPet(this.novoPet).then(() => {
        console.log('Pet adicionado com sucesso!');
        this.limparFormulario();
      });
    }
  }

  editarPet(pet: Pet) {
    this.novoPet = { ...pet };
    this.isEditing = true;
  }

  deletarPet(id: string) {
    this.petsService.deletePet(id).then(() => {
      console.log('Pet deletado com sucesso!');
    });
  }

  limparFormulario() {
    this.novoPet = {
      nome: '',
      categoria: '',
      raca: '',
      idadePet: 0,
      descricao: ''
    };
    this.isEditing = false;
  }
}