import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../../../../store';
import * as fromUser from '../../../../store/user';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  loading$!: Observable<boolean | null>;

  constructor(
    //Intancian el objeto Store
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    //Inicializo el loading
    this.loading$ = this.store.pipe(select(fromUser.getLoading));
  }

  registrarUsuario(form: NgForm) {

    if (form.valid) { //Validando el formulario
      //Correguimos el error de id--> Por el Email ya que el id lo suministrara el Backen y no el cliente
      const userCreateRequest: fromUser.UserCreateRequest = { //Se creara un usuario con sus respectivos datos
        nombre: form.value.nombre,
        apellido: form.value.apellidos,
        telefono: form.value.telefono,
        username: form.value.username,
        email: form.value.email,
        password: form.value.password
      }

      this.store.dispatch(new fromUser.SignUpEmail(userCreateRequest));

    }

  }

}
