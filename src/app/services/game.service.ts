import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, query, where, orderBy, limit } from '@angular/fire/firestore'; 

export interface GameResult {
}

@Injectable({
 providedIn: 'root'
})
export class GameService {
 saveResult: any;
 constructor(private firestore: Firestore) {}

 async getTopResults(game: string, topLimit: number = 10): Promise<GameResult[]> {
  const resultsRef = collection(this.firestore, 'gameResults');

 const q = query(
  resultsRef, 
  where('game', '==', game),
  orderBy('score', 'desc'),
      limit(topLimit) 
 );
 
 const snapshot = await getDocs(q);
 
 const results: GameResult[] = [];
  snapshot.forEach(doc => {
    results.push(doc.data() as GameResult);
});
 return results; 
 }
}