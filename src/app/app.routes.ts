import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { RegistroComponent } from './registro/registro.component';
import { QuienSoy } from './quiensoy/quiensoy';
import { Chat } from './chat/chat/chat';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'registro', component: RegistroComponent },
  { path: 'quiensoy', component: QuienSoy },
  { path: 'chat', component: Chat },
  { path: '**', component: ErrorComponent }
];
