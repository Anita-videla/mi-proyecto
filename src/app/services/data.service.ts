import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, query } from '@angular/fire/firestore';

export interface SurveyData {
  userEmail: string;
  name: string;
  age: number;
  phone: string;
  q1: string; 
  q2: string; 
  q3: string; 
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService { 
  constructor(private firestore: Firestore) {}

  async saveSurvey(data: SurveyData) {
    const surveyRef = collection(this.firestore, 'surveys');
    
    try {
      await addDoc(surveyRef, data); 
      console.log('✅ Encuesta guardada en Firebase.');
    } catch (error) {
      console.error('❌ Error guardando encuesta en Firebase:', error);
      throw new Error("No se pudo guardar la encuesta.");
    }
  }

  async getSurveyResults(): Promise<SurveyData[]> {
    const surveyRef = collection(this.firestore, 'surveys');
    const snapshot = await getDocs(query(surveyRef)); 
    
    const results: SurveyData[] = [];
    snapshot.forEach(doc => { 
      results.push(doc.data() as SurveyData);
    });
    
    return results;
  }
}