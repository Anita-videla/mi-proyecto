import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe, NgIf } from '@angular/common'; 
import { AuthService } from '../../services/auth.service';
import { DataService, SurveyData } from '../../services/data.service';

@Component({
  selector: 'app-resultados-encuesta',
  standalone: true,
  imports: [CommonModule, DatePipe, NgIf], 
  template: `
    <h2>Resultados de Encuestas (Vista Administrador) 👑</h2>
    
    <div *ngIf="loading">
      <p>Cargando resultados...</p>
    </div>
    <div *ngIf="!loading && results.length > 0">
      <table border="1" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Teléfono</th>
            <th>Q1: Favorito</th>
            <th>Q2: Noche</th>
            <th>Q3: Dispositivos</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
         <tr *ngFor="let res of results; trackBy: trackByDate">
            <td>{{ res.userEmail }}</td>
            <td>{{ res.name }}</td>
            <td>{{ res.age }}</td>
            <td>{{ res.phone }}</td>
            <td>{{ res.q1 }}</td>
            <td>{{ res.q2 }}</td>
            <td>{{ res.q3 }}</td>
            <td>{{ res.date | date:'short' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div *ngIf="!loading && results.length === 0">
      <p>No hay encuestas registradas.</p>
    </div>
  `
})
export class ResultadosEncuestaComponent implements OnInit {
  
  private dataService = inject(DataService);
  
  results: SurveyData[] = [];
  loading = true;

  async ngOnInit() {
    
    try {
      this.results = await this.dataService.getSurveyResults();
    } catch (err) {
      console.error('Error al cargar resultados:', err);
    } finally {
      this.loading = false;
    }
  }
}

