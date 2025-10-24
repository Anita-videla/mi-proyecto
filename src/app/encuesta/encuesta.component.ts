import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { DataService, SurveyData } from '../services/data.service';

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `...`, 
  styles: [
    `...`
  ]
})
export class EncuestaComponent implements OnInit {
  
  private dataService = inject(DataService);
  private authService = inject(AuthService);
  
  data: Partial<SurveyData> = {
    userEmail: '',
    name: '',
    age: undefined, 
    phone: '',
    q1: '',
    q2: '',
    q3: ''
  };

  checkboxes = { q3_1: false, q3_2: false, q3_3: false };
  checkboxError = '';
  successMsg = '';
  errorMsg = '';

  async ngOnInit() {
    const { data: { user } } = await this.authService.getUser();
    this.data.userEmail = user?.email || 'anonimo@encuesta.com';
  }

  async onSubmit(form: NgForm) {
    this.successMsg = '';
    this.errorMsg = '';
    this.checkboxError = '';

    if (this.data.age! < 18 || this.data.age! > 99) {
      this.errorMsg = '❌ La edad debe estar entre 18 y 99 años.';
      return;
    }
    
    const q3Responses = [];
    if (this.checkboxes.q3_1) q3Responses.push('Móvil');
    if (this.checkboxes.q3_2) q3Responses.push('PC');
    if (this.checkboxes.q3_3) q3Responses.push('Consola');
    
    if (q3Responses.length === 0) {
      this.checkboxError = 'Debes seleccionar al menos un dispositivo.';
      return;
    }

    if (form.invalid) {
      this.errorMsg = '❌ Por favor, completa todos los campos requeridos y revisa las validaciones.';
      return;
    }
    
    this.data.q3 = q3Responses.join(', ');
    this.data.date = new Date().toISOString();

    try {
      await this.dataService.saveSurvey(this.data as SurveyData);
      this.successMsg = '✅ Encuesta enviada con éxito.';
      
      form.resetForm({ userEmail: this.data.userEmail, age: undefined, q2: '', q3: '' }); 
      this.checkboxes = { q3_1: false, q3_2: false, q3_3: false };
      
    } catch (err: any) {
      this.errorMsg = `❌ Error al enviar la encuesta: ${err.message}`;
    }
  }
}
