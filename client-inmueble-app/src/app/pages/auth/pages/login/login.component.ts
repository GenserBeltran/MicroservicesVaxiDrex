import { from, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as fromRoot from '../../../../store';
import * as fromUser from '../../../../store/user';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading$!: Observable<boolean | null>;

  constructor(
    //Intancian el objeto Store
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
  }

  loginUsuario(form: NgForm): void {
    //Creando instancia en passordCredentials // Objeto Request de login
    const userLoginRequest: fromUser.EmailPasswordCredentials = {
      email: form.value.email,
      password: form.value.password
    };
    this.store.dispatch(new fromUser.SignInEmail(userLoginRequest));//Invoco al action para que llama al reducer y tambien al efffects
  }

}
