import { Action } from "@ngrx/store";
import { EmailPasswordCredentials, UserCreateRequest, UserResponse } from "./user.model";

export enum Types {
  //Proceso 1 (INIT) que valdia si el user se encuetra registrado o en SESION
  INIT = '[User] Init:Start',
  INIT_AUTHORIZED = '[User] Init:Authorized', //USER EN SESION
  INIT_UNAUTHORIZED = '[User] Init:Unuthorized', //NO SESION
  INIT_ERROR = '[User] Init:Error',// USER ERROR

  //Proceso 2 para login
  SIGIN_IN_EMAIL = '[User] Login:Start',
  SIGIN_IN_EMAIL_SUCCESS = '[User] Login:Success',
  SIGIN_IN_EMAIL_ERROR = '[User] Login:Error',

  //Proceso 3 para SingUp
  SIGN_UP_EMAIL = '[User] Registrar usuario con email:Start',
  SIGN_UP_EMAIL_SUCCESS = '[User] Registrar usuario con email:Success',
  SIGN_UP_EMAIL_ERROR = '[User] Registrar usuario con email:Error',

  //Proceso 4 para Logout
  SIGN_OUT_EMAIL = '[User] Logout:Start',
  SIGN_OUT_EMAIL_SUCCESS = '[User] Logout:Success',
  SIGN_OUT_EMAIL_ERROR = '[User] Logout:Error',
}

//Metodos action que llamara Proceso 1
export class Init implements Action {
  readonly type = Types.INIT;
  constructor() { }
}

export class InitAuthorized implements Action {
  readonly type = Types.INIT_AUTHORIZED;
  constructor(public email: string, public user: UserResponse | null)//devuelve los valores
  { }
}

export class InitUnauthorized implements Action {
  readonly type = Types.INIT_UNAUTHORIZED;
  constructor() { }
}

export class InitError implements Action {
  readonly type = Types.INIT_ERROR;
  constructor(public error: string) { }
}


//Metodos action que llamara Proceso 2
export class SignInEmail implements Action {
  readonly type = Types.SIGIN_IN_EMAIL;
  constructor(public credentials: EmailPasswordCredentials) { }
}

export class SignInEmailSuccess implements Action {
  readonly type = Types.SIGIN_IN_EMAIL_SUCCESS;
  constructor(public email: string, public user: UserResponse | null)//devuelve los valores
  { }
}

export class SignInEmailError implements Action {
  readonly type = Types.SIGIN_IN_EMAIL_ERROR;
  constructor(public error: string) { }
}
//Metodos action que llamara Proceso 3
export class SignUpEmail implements Action {
  readonly type = Types.SIGN_UP_EMAIL;
  constructor(public user: UserCreateRequest) { }
}

export class SignUpEmailSuccess implements Action {
  readonly type = Types.SIGN_UP_EMAIL_SUCCESS;
  constructor(public email: string, public user: UserResponse | null)//devuelve los valores
  { }
}

export class SignUpEmailError implements Action {
  readonly type = Types.SIGN_UP_EMAIL_ERROR;
  constructor(public error: string) { }
}

//Metodos action que llamara Proceso 4
export class SignOutEmail implements Action {
  readonly type = Types.SIGN_OUT_EMAIL;
  constructor() { }
}

export class SignOutEmailSuccess implements Action {
  readonly type = Types.SIGN_OUT_EMAIL_SUCCESS;
  constructor() { }
}

export class SignOutEmailError implements Action {
  readonly type = Types.SIGN_OUT_EMAIL_ERROR;
  constructor(public error: string) { }
}

//Exporto todos los metodos creados Sesion Login Registro y Salir  Para que puedan ser tuilizados por los demas componente
export type All =
  Init |
  InitUnauthorized |
  InitAuthorized |
  InitError |
  SignInEmail |
  SignInEmailSuccess |
  SignInEmailError |
  SignUpEmail |
  SignUpEmailSuccess |
  SignUpEmailError |
  SignOutEmail |
  SignOutEmailSuccess |
  SignOutEmailError;







