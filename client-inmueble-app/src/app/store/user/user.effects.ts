import { environment } from './../../../environments/environment.prod';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as fromActions from "./user.actions";
import { HttpClient } from '@angular/common/http'
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { NotificacionService } from "../../services";
import { Router } from "@angular/router";
import { UserResponse } from './user.model';
import { Injectable } from '@angular/core';


type Action = fromActions.All; //Creo el disparador al abckend

@Injectable()
export class UserEffects {
  constructor(
    //Objetos para conexion pre y post a BackEnd
    private httpClient: HttpClient,
    private actions: Actions,
    private notification: NotificacionService,//Servicio global de notificaciones
    private router: Router
  ) { }

  //Login
  signUpEmail: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.SIGN_UP_EMAIL),
      map((action: fromActions.SignUpEmail) => action.user),//Exterae la Data del constructor
      switchMap(userData => //Ya puedo usar el map
        this.httpClient.post<UserResponse>(`${environment.url}api/authenticacion/sign-up`, userData)//Se ejecuta si fue exitosa la Op adecuadamente
          .pipe(
            tap((response: UserResponse) => { //Este pipe ecalua el posible resultado luego del llamado del la url Backend
              localStorage.setItem('token', response.token);
              this.router.navigate(['/']);
            }),
            map((response: UserResponse) => new fromActions.SignUpEmailSuccess(response.email, response || null),//Este crea un Observable
              catchError(err => { //Este no crea un Observable
                this.notification.error("Errores al Registrar a new User");
                return of(new fromActions.SignUpEmailError(err.message));
              })
            )
          )

        //Si es correcto ejeuta el tap y luego ejecuta el map
      )
    )
  );

  //Autoriazacion
  signInEmail: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.SIGIN_IN_EMAIL),
      map((action: fromActions.SignInEmail) => action.credentials),//Exterae la Data del constructor
      switchMap(credentialsData => //Ya puedo usar el map
        this.httpClient.post<UserResponse>(`${environment.url}api/authenticacion/sign-in`, credentialsData)//Se ejecuta si fue exitosa la Op adecuadamente
          .pipe(
            tap((response: UserResponse) => { //Este pipe ecalua el posible resultado luego del llamado del la url Backend
              localStorage.setItem('token', response.token);
              this.router.navigate(['/']);
            }),
            map((response: UserResponse) => new fromActions.SignInEmailSuccess(response.email, response || null),//Este crea un Observable
              catchError(err => { //Este no crea un Observable
                this.notification.error("Errores al Registrar a new Credentials");
                return of(new fromActions.SignInEmailError(err.message));
              })
            )
          )

        //Si es correcto ejeuta el tap y luego ejecuta el map
      )
    )
  );

  //User en Sesion
  init: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.INIT),
      switchMap(async () => localStorage.getItem('token')),
      switchMap(token => {  //Se evalua el token
        if (token) {
          return this.httpClient.get<UserResponse>(`${environment.url}/api/user/`)//Se ejecuta si fue exitosa la Op adecuadamente
            .pipe(
              tap((user: UserResponse) => { //Este pipe ecalua el posible resultado luego del llamado del la url Backend
                console.log('Data del user en sesion que viene del servidor', user)
              }),
              map((user: UserResponse) => new fromActions.InitAuthorized(user.email, user || null),//Este crea un Observable
                catchError(err => { //Este no crea un Observable
                  return of(new fromActions.InitError(err.message));
                })
              )
            )
        } else {
          return of(new fromActions.InitUnauthorized());
        }
      }


        //Si es correcto ejeuta el tap y luego ejecuta el map
      )
    )
  );
}
