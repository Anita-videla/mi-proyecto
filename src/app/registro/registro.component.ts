import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.component.html'
})
export class RegistroComponent {
  email = '';
  password = '';
  errorMsg = '';
  successMsg = '';

  constructor(private auth: AuthService, private router: Router) {}

  async onRegister() {
    this.errorMsg = '';
    this.successMsg = '';

    try {
      const user = await this.auth.register(this.email, this.password);

      if (user) {
        this.successMsg = '✅ Registro exitoso. Redirigiendo...';
        setTimeout(() => {
          this.router.navigate(['/home']); 
        }, 1500);
      }
    } catch (err: any) {
      this.errorMsg = '❌ Error al registrar: ' + err.message;
    }
  }
}

