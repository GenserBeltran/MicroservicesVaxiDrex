import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';


export interface Notificacion {
  message: string;
}


@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.scss']
})
export class NotificacionComponent implements OnInit {

  //Inyectando la data
  //componente de material design para el Envio de la data MAT_SNACK_BAR_DATA
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: Notificacion) { }

  ngOnInit(): void {
  }

}
