import { Router } from '@angular/router';
import { getIsAuthorized } from './store/user/user.selector';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NotificacionService } from './services';
//Intancia para salir y del user sesion
import * as  fromRoot from "./store";
import * as  fromUser from "./store/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  //Segun el estado boleano muestra el spiner
  showSpinner = false;

  title = 'client-inmueble-app';

  user$!: Observable<fromUser.UserResponse>;
  isAuthorized$!: Observable<boolean>;

  constructor(
    private fs: AngularFirestore,
    private notificacion: NotificacionService,
    //Variables para las intancias
    private store: Store<fromRoot.State>,
    private router: Router

  ) {
  }

  ngOnInit() {
    this.fs.collection('test').stateChanges().subscribe(personas => {
      console.log(personas.map(x => x.payload.doc.data()))
    })

    //Obtener el valor del user sesion y autorizadao
    this.user$ = this.store.pipe(select(fromUser.getUser)) as Observable<fromUser.UserResponse>;
    this.isAuthorized$ = this.store.pipe(select(fromUser.getIsAuthorized)) as Observable<boolean>;

    //Disparando el evento de iniciar sesion
    this.store.dispatch(new fromUser.Init());
  }

  onToggleSpinner(): void {
    this.showSpinner = !this.showSpinner;
  }

  //metodo que me devuelve la url de las imagenes subidas par aluego agrebar a la DB
  onFilesChanged(urls: string | string[]): void {
    console.log('urls', urls);
  }

  //Metodo para mensaje success
  onSuccess(): void {
    this.notificacion.success("El procediminento fue exitoso");
  }

  //Metodo para mensaje error
  onError(): void {
    this.notificacion.error("Se encontraron errores en el proceso");
  }

  //Metodo para hacer singOut
  onSignOut(): void {
    localStorage.removeItem('token');
    this.store.dispatch(new fromUser.SignOut());
    this.router.navigate(['/auth/login']);

  }

}
