import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface Message {
  texto: string;
  usuario: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://osybyzyvxfiuwiwhuqnc.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....'
    );
  }

  async getMessages(): Promise<Message[]> {
    const { data, error } = await this.supabase
      .from('messages') // <- quitar <Message>
      .select('*')
      .order('fecha', { ascending: true });

    if (error) {
      console.error('Error al obtener mensajes:', error);
      return [];
    }

    return (data as Message[]) || [];
  }

  async sendMessage(texto: string, usuario: string): Promise<void> {
    const { error } = await this.supabase
      .from('messages') // <- quitar <Message>
      .insert([
        { texto, usuario, fecha: new Date().toISOString() }
      ]);

    if (error) {
      console.error('Error al enviar mensaje:', error);
    }
  }
}
