import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { LogService } from '../services/log.service'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html'  
})
export class Login {
  email = '';
  password = '';
  errorMsg = '';
  successMsg = '';

  constructor(
    private auth: AuthService, 
    private router: Router,
    private logService: LogService // NEW INJECTION
  ) {}

  async onLogin() {
    this.errorMsg = '';
    this.successMsg = '';

    try {
      const { data, error } = await this.auth.login(this.email, this.password);

      if (error) {
        throw new Error(error.message); 
      }
      
      if (data.user) {
        // ✅ Sprint 2: Registrar el log de ingreso en Firebase (Firestore)
        this.logService.addLoginLog(this.email); 

        this.successMsg = '✅ Login exitoso. Redirigiendo...';
        setTimeout(() => {
          this.router.navigate(['/home']); 
        }, 1500);
      }
    } catch (err: any) {
      this.errorMsg = '❌ Error al iniciar sesión: ' + (err.message || 'Credenciales inválidas.');
    }
  }

  // Botones de acceso rápido
  quickLogin(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}