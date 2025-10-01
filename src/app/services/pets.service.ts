import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Pet {
  id?: string;
  nome: string;
  categoria: string;
  raca: string;
  idadePet: number | null;
  descricao: string;
}

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  constructor(private firestore: Firestore) { }

  getPets(): Observable<Pet[]> {
    const petsCollection = collection(this.firestore, 'pets');
    return collectionData(petsCollection, { idField: 'id' }) as Observable<Pet[]>;
  }

  addPet(pet: Pet) {
    const petsCollection = collection(this.firestore, 'pets');
    return addDoc(petsCollection, pet);
  }

  updatePet(pet: Pet) {
    const petDocRef = doc(this.firestore, `pets/${pet.id}`);
    return updateDoc(petDocRef, { ...pet });
  }

  deletePet(id: string) {
    const petDocRef = doc(this.firestore, `pets/${id}`);
    return deleteDoc(petDocRef);
  }
}