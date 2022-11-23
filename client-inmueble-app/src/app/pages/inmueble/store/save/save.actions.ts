import { Action } from "@ngrx/store";
import { InmuebleCreateRequest, InmuebleResponse } from "./save.models";

// Operaciones (Pasa x 3 estados)
// Disparador(create)
// CreateSuccess(Si es exitoso el registro)
// CreateError(Errores de transaccion)

//Operaciones a crear
export enum Types {
  CREATE = '[Inmueble] Create: Start',
  CREATE_SUCCESS = '[Inmueble] Create: Succes',
  CREATE_ERROR = '[Inmueble] Create: Error',
}

//funciones(Actions para crear un nuevo inmueble)

//1
export class Create implements Action {
  readonly type = Types.CREATE;
  constructor(public inmueble: InmuebleCreateRequest) {

  }

}

//2
export class CreateSuccess implements Action {
  readonly type = Types.CREATE_SUCCESS;
  constructor(public inmueble: InmuebleResponse) {

  }
}

//3
export class CreateError {
  readonly type = Types.CREATE_ERROR;
  constructor(public error: string) { }
}

//Exportamos las clases
export type All = Create | CreateSuccess | CreateError;
