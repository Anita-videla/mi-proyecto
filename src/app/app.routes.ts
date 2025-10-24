import { Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';

// Importaciones de Guards (asumo que están directamente en src/app/guards)
import { AuthGuardFn } from './guards/auth.guard';
import { AdminGuardFn } from './guards/admin.guard'; 

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  

  { path: 'login', loadComponent: () => import('./login/login').then(m => m.Login) },
  { path: 'registro', loadComponent: () => import('./registro/registro.component').then(m => m.RegistroComponent) },
  { path: 'quiensoy', loadComponent: () => import('./quiensoy/quiensoy').then(m => m.QuienSoy) },
  
  { path: 'home', loadComponent: () => import('./home/home').then(m => m.Home), canActivate: [AuthGuardFn] },
  { path: 'chat', loadComponent: () => import('./chat/chat/chat').then(m => m.Chat), canActivate: [AuthGuardFn] },

  
  { path: 'ahorcado', loadComponent: () => import('./juegos/ahorcado/ahorcado.component').then(m => m.AhorcadoComponent), canActivate: [AuthGuardFn] },
  { path: 'mayor-menor', loadComponent: () => import('./juegos/mayor-menor/mayor-menor.component').then(m => m.MayorMenorComponent), canActivate: [AuthGuardFn] },
  { path: 'preguntados', loadComponent: () => import('./juegos/preguntados/preguntados.component').then(m => m.PreguntadosComponent), canActivate: [AuthGuardFn] },
  { path: 'juego-propio', loadComponent: () => import('./juegos/juego-propio/juego-propio.component').then(m => m.JuegoPropioComponent), canActivate: [AuthGuardFn] },

  { path: 'encuesta', loadComponent: () => import('./encuesta/encuesta.component').then(m => m.EncuestaComponent), canActivate: [AuthGuardFn] },
  
  { path: 'resultados-juegos', loadComponent: () => import('../resultados-juegos/resultados-juegos.component').then(m => m.ResultadosJuegosComponent), canActivate: [AuthGuardFn] },
  
  { 
    path: 'resultados-encuesta', 
    loadComponent: () => import('../resultados-encuesta/resultados-encuesta.component').then(m => m.ResultadosEncuestaComponent),
    canActivate: [AdminGuardFn] 
  },

  { path: '**', component: ErrorComponent }
];
