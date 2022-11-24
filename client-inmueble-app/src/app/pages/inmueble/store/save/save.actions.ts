import { Action } from "@ngrx/store";
import { InmuebleCreateRequest, InmuebleResponse } from "./save.models";

// Operaciones (Pasa x 3 estados)
// Disparador(create)
// CreateSuccess(Si es exitoso el registro)
// CreateError(Errores de transaccion)

//Operaciones a crear
export enum Types {
  CREATE = '[Inmueble] Create: Start',
  CREATE_SUCCESS = '[Inmueble] Create: Success',
  CREATE_ERROR = '[Inmueble] Create: Error',

  READ = '[Inmueble] Read',
  READ_SUCCESS = '[Inmueble] Read: Success',
  READ_ERROR = '[Inmueble] Read: Error',

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
export class CreateError implements Action {
  readonly type = Types.CREATE_ERROR;
  constructor(public error: string) {
  }
}

//funciones(Actions para listar inmueble)

//1
export class Read implements Action {
  readonly type = Types.READ;
  constructor() {
  }
}

//2
export class ReadSuccess implements Action {
  readonly type = Types.READ_SUCCESS;
  constructor(public inmuebles: InmuebleResponse[]) { }//Si es exitosa la Op me devolvera la coleccion de inmuebles
}

//3
export class ReadError implements Action {
  readonly type = Types.READ_ERROR;
  constructor(public error: string) { }
}


//Exportamos las clases
export type All = Create | CreateSuccess | CreateError | Read | ReadSuccess | ReadError;
