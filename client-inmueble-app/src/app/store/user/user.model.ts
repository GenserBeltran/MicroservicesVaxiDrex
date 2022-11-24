
//Objeto Request
//Transacion para hcer login

import { User } from '../../models/backend/user';

//Exporto el modelos del Bakend response (qeu es lo qeu este request va a generar)
export { User as UserResponse } from '../../models/backend/user';
export interface EmailPasswordCredentials {
  email: string;
  password: string;
}


//Para el registro, envio el backedn y password de confirmacion, entonces debo modelar(backend) el objeto request
export interface UserRequest extends User {
  password: string;//Y agrego el atributo faltante
}

export type UserCreateRequest = Omit<UserRequest, 'token' | 'id' >;
