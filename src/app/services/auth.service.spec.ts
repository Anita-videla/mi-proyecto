import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private supabaseService: SupabaseService) {}

  // ejemplo de login (ajusta a tu tabla/estructura)
  async login(email: string, password: string) {
    const { data, error } = await this.supabaseService['supabase']
      .auth.signInWithPassword({ email, password });

    if (error) {
      console.error('Error en login:', error.message);
      return null;
    }

    return data;
  }

  async register(email: string, password: string) {
    const { data, error } = await this.supabaseService['supabase']
      .auth.signUp({ email, password });

    if (error) {
      console.error('Error en registro:', error.message);
      return null;
    }

    return data;
  }
}
