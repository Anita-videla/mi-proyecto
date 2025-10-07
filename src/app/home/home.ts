import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  email = '';
  loading = true;

  constructor(private auth: AuthService, private router: Router) {
    this.loadUser();
  }

  async loadUser() {
    try {
      const { data, error } = await this.auth.getUser();
      if (error) {
        console.error('Error al obtener usuario:', error.message);
      }
      this.email = data?.user?.email || '';
    } catch (err) {
      console.error('Error inesperado al cargar usuario:', err);
    } finally {
      this.loading = false;
    }
  }

  async logout() {
    try {
      await this.auth.logout();
      this.router.navigate(['/login']);
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
  }
}




