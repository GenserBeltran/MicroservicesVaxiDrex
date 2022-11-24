import { tap, map, switchMap, delay, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from './../../../../../environments/environment';
import { InmuebleCreateRequest, InmuebleResponse } from './save.models';
import { ofType } from '@ngrx/effects';
import { createEffect } from '@ngrx/effects';
import { NotificacionService } from './../../../../services/notificacion/notificacion.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as fromActions from './save.actions';

//Type que representa todos los actions
type Action = fromActions.All;

@Injectable()
export class SaveEffects {

  constructor(
    private actions: Actions,
    private httpClient: HttpClient,
    private route: Router,
    private notificacion: NotificacionService
  ) { }

  //Registro
  create: Observable<Action> = createEffect(() =>
    this.actions.pipe( //Comienza la secuencia de eventos
      ofType(fromActions.Types.CREATE), //tipo Create
      map((action: fromActions.Create) => action.inmueble), //Inyectando(Setear) el objeto(Parametro) de tipo Inmueble
      switchMap((request: InmuebleCreateRequest) =>  //Recibe el request
        this.httpClient.post<InmuebleResponse>(`${environment.url}gateway/inmueble`, request)//El tipo de objeto que devuelve (response) le indico su ENDPOINT
          .pipe(
            delay(1000),
            tap((response: InmuebleResponse) => {//Obteniendo respuesta que envia el servidor
              this.route.navigate(['inmueble/list']);//redericcionandao hacia la lista de inmuebles
            }),
            map((inmueble: InmuebleResponse) => new fromActions.CreateSuccess(inmueble)),//Se genera una instancia de la clase fromaActions.CreateSuccess
            catchError(err => {//En caso de error
              this.notificacion.error(`Errores guardando el onmueble:${err.message}`);
              return of(new fromActions.CreateError(err.message))
            })
          )
      )
    )
  );

  //Listar INmuebles

  read: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.READ),
      switchMap(() =>
        this.httpClient.get<InmuebleResponse[]>(`${environment.url}gateway/inmueble`)
          .pipe(
            delay(1000),
            map((inmuebles: InmuebleResponse[]) => new fromActions.ReadSuccess(inmuebles)),
            catchError(err => of(new fromActions.ReadError(err.message)))
          )
      )
    )
  );


}
