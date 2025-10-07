import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  constructor(private firestore: Firestore) {}

  async addLoginLog(email: string) {
    const logsRef = collection(this.firestore, 'userLogs');
    const log = {
      email: email,
      fecha: new Date().toISOString()
    };

    try {
      await addDoc(logsRef, log);
      console.log('✅ Log guardado en Firebase:', log);
    } catch (error) {
      console.error('❌ Error guardando log en Firebase:', error);
    }
  }
}

