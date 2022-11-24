import { InmuebleResponse } from "./save.models";
import * as fromActions from './save.actions';

//Data que se almacena en storage Temporal de Angular
export interface ListState {

  inmuebles: InmuebleResponse[] | null; //Dato que represneta la conlecion de imnuebles
  inmueble: InmuebleResponse | null;
  loading: boolean | null;
  error: string | null;
}

//inicializo la estructura
export const initialState: ListState = {

  inmuebles: null,
  inmueble: null,
  loading: null,
  error: null
}

export function reducer(state: ListState = initialState, action: fromActions.All | any) {
  switch (action.type) {

    //Casos para registrar Inmueble
    case fromActions.Types.CREATE: {
      return { ...state, loading: true, error: null }
    }

    case fromActions.Types.CREATE_SUCCESS: {
      return { ...state, loading: false, error: null, inmueble: action.inmueble }
    }

    case fromActions.Types.CREATE_ERROR: {
      return { ...state, loading: false, error: action.error }
    }
    //Casos para listar Inmueble
    case fromActions.Types.READ: {
      return { ...state, loading: true, error: null }
    }

    case fromActions.Types.READ_SUCCESS: { //Instancia un constructor con la lista de inmuebles
      return { ...state, loading: false, inmuebles: action.inmuebles }
    }

    case fromActions.Types.READ_ERROR: {
      return { ...state, loading: false, error: action.error }
    }

    default: {
      return state; //Retorna el valor que tiene en memoria
    }
  }
}
