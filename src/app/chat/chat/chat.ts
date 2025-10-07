import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService, Message } from '../chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css']
})
export class Chat {
  mensajes: Message[] = [];
  nuevoMensaje = '';
  user_email = 'anon@chat.com';

  constructor(private chatService: ChatService) {}

  async ngOnInit() {
    this.mensajes = await this.chatService.getMessages();
  }

  async enviar() {
    if (!this.nuevoMensaje.trim()) return;

    await this.chatService.sendMessage(this.nuevoMensaje, this.user_email);

    this.mensajes.push({
      texto: this.nuevoMensaje,
      usuario: this.user_email,
      fecha: new Date().toISOString()
    });

    this.nuevoMensaje = '';
  }
}
