import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Cuidador {
  id?: string;
  nomeCuidador: string;
  cell: string;
  tempoExperiencia: number | null;
  conhecimentos: string;
}

@Injectable({
  providedIn: 'root'
})
export class CuidadoresService {

  constructor(private firestore: Firestore) { }
  getCuidadores(): Observable<Cuidador[]> {
    const cuidadoresCollection = collection(this.firestore, 'cuidadores');
    return collectionData(cuidadoresCollection, { idField: 'id' }) as Observable<Cuidador[]>;
  }

  addCuidador(cuidador: Cuidador) {
    const cuidadoresCollection = collection(this.firestore, 'cuidadores');
    return addDoc(cuidadoresCollection, cuidador);
  }

  updateCuidador(cuidador: Cuidador) {
    const cuidadorDocRef = doc(this.firestore, `cuidadores/${cuidador.id}`);
    return updateDoc(cuidadorDocRef, { ...cuidador });
  }

  deleteCuidador(id: string) {
    const cuidadorDocRef = doc(this.firestore, `cuidadores/${id}`);
    return deleteDoc(cuidadorDocRef);
  }
}