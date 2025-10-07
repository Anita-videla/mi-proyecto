import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

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

  constructor(private auth: AuthService, private router: Router) {}

  async onLogin() {
    this.errorMsg = '';
    this.successMsg = '';

    try {
      const user = await this.auth.login(this.email, this.password);

      if (user) {
        this.successMsg = '✅ Login exitoso. Redirigiendo...';
        setTimeout(() => {
          this.router.navigate(['/home']); 
        }, 1500);
      }
    } catch (err: any) {
      this.errorMsg = '❌ Error al iniciar sesión: ' + err.message;
    }
  }

  // Botones de acceso rápido
  quickLogin(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}




