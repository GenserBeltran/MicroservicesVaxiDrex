import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificacionComponent } from './components';

@Injectable()
export class NotificacionService {

  //Se instancia en el constructor el SnackBsar qeu es el contenedor donde van los msn
  constructor(private snackBar: MatSnackBar) { }

  error(message: string): void {
    this.snackBar.openFromComponent(NotificacionComponent, {//Coponente a desplegar
      duration: 3000,
      data: { message }, //Mensaje a enviar
      panelClass: ['mat-snackbar_error'] //Estilos para el popup
    });
  }

  success(message: string): void {
    this.snackBar.openFromComponent(NotificacionComponent, {//Coponente a desplegar
      duration: 3000,
      data: { message }, //Mensaje a enviar
      panelClass: ['mat-snackbar_success'] //Estilos para el popup
    });
  }
}
