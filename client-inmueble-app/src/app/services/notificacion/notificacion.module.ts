import { NotificacionComponent } from './components/notificacion/notificacion.component';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionService } from './notificacion.service';
import { MatSnackBarModule } from '@angular/material/snack-bar'

@NgModule({
  declarations: [
    NotificacionComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule
  ]
})
export class NotificacionModule {

  //Estanciar una sola vez el servicio en cuanto sea llamado el proyecto
  static forRoot(): ModuleWithProviders<NotificacionModule> {
    return {
      ngModule: NotificacionModule,
      providers: [
        NotificacionService
      ]
    };
  }
}
