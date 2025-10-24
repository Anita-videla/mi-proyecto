import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

export interface PreguntadosQuestion {
  imageUrl: string;
  correctAnswer: string;
  options: string[];
}

interface TmdbResult {
  id: number;
  title: string;
  poster_path: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private headers: HttpHeaders;

  constructor() {
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.tmdbReadAccessToken}`
    });
  }

  // Método para obtener preguntas desde TMDb
  async getQuestions(): Promise<PreguntadosQuestion[]> {
    const endpoint = '/movie/popular'; 
    const url = environment.tmdbApiUrl + endpoint;
    
    try {
      //  Hacer la solicitud a la API de TMDb
      const response: any = await firstValueFrom(
        this.http.get(url, { headers: this.headers })
      );

      const results: TmdbResult[] = response.results.slice(0, 10); // Tomamos 10 películas para generar preguntas

      if (!results || results.length < 4) {
        throw new Error('No se encontraron suficientes películas en la API para generar preguntas.');
      }

      //  Mapear y generar opciones aleatorias para cada pregunta
      return results.map((correctMovie, index, array) => {
        // Generar 3 opciones incorrectas aleatorias
        const incorrectOptions: string[] = [];
        let shuffled = [...array].sort(() => 0.5 - Math.random());
        
        for (let movie of shuffled) {
          if (movie.id !== correctMovie.id && incorrectOptions.length < 3) {
            incorrectOptions.push(movie.title);
          }
        }

        // Formar la lista final de opciones (Correcta + 3 Incorrectas)
        let allOptions = [correctMovie.title, ...incorrectOptions.slice(0, 3)];
        allOptions.sort(() => 0.5 - Math.random()); // Mezclar las opciones
        
        // La URL completa de la imagen
        const imageUrl = environment.tmdbImageUrl + correctMovie.poster_path;

        return {
          imageUrl: imageUrl,
          correctAnswer: correctMovie.title,
          options: allOptions
        };
      });

    } catch (error) {
      console.error('❌ Error al obtener preguntas de TMDb. Retornando preguntas de fallback:', error);
      // Retorna una pregunta de fallback si la API falla, asegurando que la app no se rompa
      return this.getFallbackQuestions(); 
    }
  }

  // Fallback en caso de error en la API
  private getFallbackQuestions(): PreguntadosQuestion[] {
    return [
      {
        imageUrl: 'https://via.placeholder.com/500?text=API+Error',
        correctAnswer: 'Película de Fallback',
        options: ['Opción A', 'Película de Fallback', 'Opción C', 'Opción D']
      }
    ];
  }
}