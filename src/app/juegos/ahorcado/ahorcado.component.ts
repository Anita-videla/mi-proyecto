import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService, GameResult } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Juego: Ahorcado 🖼️</h2>
    
    <p>Palabra: [ _ _ _ _ ]</p>
    <p>Intentos Restantes: 6</p>
    
    <div class="keyboard" style="margin-top: 20px;">
      <button (click)="guessLetter('A')">A</button>
      <button (click)="guessLetter('B')">B</button>
      <p>... más botones ...</p>
    </div>

    <p>Puntaje Actual: {{ currentScore }}</p>
    <button (click)="finishGame(currentScore)">Finalizar Juego y Guardar Score</button>
  `
})
export class AhorcadoComponent implements OnInit {
  
  private gameService = inject(GameService);
  private authService = inject(AuthService);
  
  gameTitle = 'Ahorcado';
  userEmail: string = '';
  currentScore: number = 0; // Ejemplo de score: letras acertadas

  async ngOnInit() {
    const { data: { user } } = await this.authService.getUser();
    this.userEmail = user?.email || 'unknown';
    // Lógica para iniciar la palabra.
  }

  guessLetter(letter: string) {
    console.log('Letra adivinada:', letter);
    // Lógica para procesar la letra adivinada y actualizar el puntaje.
  }

  async finishGame(score: number) {
    const result: GameResult = {
      game: this.gameTitle,
      userEmail: this.userEmail,
      score: score,
      date: new Date().toISOString(),
    };
    
    try {
      await this.gameService.saveResult(result);
      alert('Resultado de Ahorcado guardado con éxito!');
    } catch (error) {
      alert('Error al guardar el resultado.');
    }
  }
}