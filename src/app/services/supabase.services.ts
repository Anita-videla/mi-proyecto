import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    // Configura tu cliente de Supabase
    const supabaseUrl = environment.supabaseUrl || 'https://osybyzyvxfiuwiwhuqnc.supabase.co';
    const supabaseKey = environment.supabaseKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zeWJ5enl2eGZpdXdpd2h1cW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5NzM2MTgsImV4cCI6MjA3NDU0OTYxOH0.Un3yogws7GBLv2xFsuwaOd86G0I0UrQNi2AUh9GY5-M';
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  // ✅ Ejemplo: obtener todos los registros de una tabla
  async getData(table: string) {
    const { data, error } = await this.supabase
      .from(table)
      .select('*');

    if (error) {
      console.error(`Error al consultar ${table}:`, error.message);
      return [];
    }

    return data;
  }

  // ✅ Ejemplo: insertar un nuevo registro en una tabla
  async insertData(table: string, newItem: any) {
    const { data, error } = await this.supabase
      .from(table)
      .insert([newItem]);

    if (error) {
      console.error(`Error al insertar en ${table}:`, error.message);
      return null;
    }

    return data;  
  }
}    
