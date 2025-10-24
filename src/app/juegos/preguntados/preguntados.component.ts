import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common'; 
import { Router, RouterLink } from '@angular/router'; 
import { AuthService } from '../../services/auth.service';
import { ApiService, PreguntadosQuestion } from '../../services/api.service';
import { GameService } from '../../services/game.service'; 

@Component({
  selector: 'app-preguntados',
  standalone: true, 
  imports: [CommonModule, RouterLink, NgClass], 
  templateUrl: './preguntados.component.html', 
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {

  private authService = inject(AuthService);
  private apiService = inject(ApiService);
  private gameService = inject(GameService); 
  private router = inject(Router); 

  
  userEmail: string = '';
  questions: PreguntadosQuestion[] = [];
  currentQuestionIndex: number = 0;
  currentQuestion: PreguntadosQuestion | null = null;
  totalQuestions: number = 0;
  currentScore: number = 0;
  isAnswered: boolean = false;
  
  feedbackMessage: string = '';
  gameOver: boolean = false;


  async ngOnInit() {
  
    this.gameOver = false;
    this.currentScore = 0;
    this.currentQuestionIndex = 0;
    this.feedbackMessage = 'Cargando preguntas de TMDb...';

    const { data: { user } } = await this.authService.getUser();
    this.userEmail = user?.email || 'unknown';
    
    try {
      this.questions = await this.apiService.getQuestions(); 
      this.totalQuestions = this.questions.length;
      this.currentQuestion = this.questions[0]; 
      this.feedbackMessage = ''; 
    } catch (error) {
      console.error(error);
      this.feedbackMessage = 'Error al cargar las preguntas. Revisa la consola y tu clave API.';
      this.gameOver = true;
    }
  }

  selectAnswer(selectedOption: string) {
    if (this.isAnswered || this.gameOver) return;

    this.isAnswered = true;

    if (selectedOption === this.currentQuestion?.correctAnswer) {
      this.currentScore++;
      this.feedbackMessage = '¡Correcto! 🎉';
    } else {
      this.feedbackMessage = `Incorrecto. La respuesta era: ${this.currentQuestion?.correctAnswer}`;
    }

    // Esperar un momento antes de pasar a la siguiente pregunta
    setTimeout(() => {
      this.nextQuestion();
    }, 1500);
  }

  nextQuestion() {
    this.isAnswered = false;
    this.feedbackMessage = '';
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex < this.totalQuestions) {
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    } else {
      this.gameOver = true;
      this.feedbackMessage = `Juego Terminado. Tu puntaje final es: ${this.currentScore}/${this.totalQuestions}`;
      this.finishGame(this.currentScore); 
    }
  }
  
  async finishGame(score: number) {
    const result = {
      game: 'Preguntados',
      userEmail: this.userEmail,
      score: score,
      date: new Date().toISOString(),
    };
    
    try {
      await this.gameService.saveResult(result);
      console.log('Resultado guardado con éxito.');
    } catch (error) {
      console.error('Error al guardar el resultado:', error);
    }
  }

  
  restartGame() {
    this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/preguntados']);
    });
  }
}