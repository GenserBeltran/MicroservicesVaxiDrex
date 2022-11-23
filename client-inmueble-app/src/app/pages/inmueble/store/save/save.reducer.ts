import { InmuebleResponse } from "./save.models";
import * as fromActions from './save.actions';

//Data que se almacena en storage Temporal de Angular
export interface ListState {
  inmueble: InmuebleResponse | null;
  loading: boolean | null;
  error: string | null;
}

//inicializo la estructura
export const initialSate: ListState = {
  inmueble: null,
  loading: null,
  error: null
}

export function reducer(state: ListState = initialSate, action: fromActions.All | any) {
  switch (action.type) {
    case fromActions.Types.CREATE: {
      return { ...state, loading: true, error: null }
    }

    case fromActions.Types.CREATE_SUCCESS: {
      return { ...state, loading: false, error: null, inmueble: action.inmueble }
    }

    case fromActions.Types.CREATE_ERROR: {
      return { ...state, loading: false, error: action.error }
    }

    default: {
      return state; //Retorna el valor que tiene en memoria
    }
  }
}
