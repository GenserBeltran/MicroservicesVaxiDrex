import { UserResponse } from "./user.model";
import * as fromActions from "../user/user.actions";

//Definir la data User que quiero almacenar en memoria (LOCAL)
export interface UserState {
  entity: UserResponse | null;
  id: string | null;
  email: string | null;
  loading: boolean | null;
  error: string | null;
}

//Inicializo las variables
const initialState: UserState = {
  entity: null,
  id: null,
  email: null,
  loading: null,
  error: null
}

//Utilizo los actionj para asignarle  la data a las variables
export function reducer(state = initialState, action: fromActions.All | any): UserState {

  switch (action.type) {

    //Proceso 1
    case fromActions.Types.INIT: {
      return { ...state, loading: true };
    }

    case fromActions.Types.INIT_AUTHORIZED: {
      return { ...state, loading: false, entity: action.user, email: action.email, error: null }; //Se cambia el id: action.id y se coloca el email

    }

    case fromActions.Types.INIT_UNAUTHORIZED: {
      return { ...state, loading: false, entity: null, email: null, error: null }; // Se cambia el id: null y se coloca el email

    }

    case fromActions.Types.INIT_ERROR: {
      return { ...state, loading: false, entity: null, email: null, error: action.error };// Se cambia el id: null y se coloca el email

    }
    //Proceso 2
    case fromActions.Types.SIGIN_IN_EMAIL: {
      return { ...state, loading: true, entity: null, email: null, error: null };// Se cambia el id: null y se coloca el email
    }

    case fromActions.Types.SIGIN_IN_EMAIL_SUCCESS: {
      return { ...state, loading: false, entity: action.user, email: action.email, error: null };//Se cambia el id: action.id y se coloca el email

    }

    case fromActions.Types.SIGIN_IN_EMAIL_ERROR: {
      return { ...state, loading: false, entity: null, email: null, error: action.error };// Se cambia el id: null y se coloca el email

    }
    //Proceso 3
    case fromActions.Types.SIGN_UP_EMAIL: {
      return { ...state, loading: true, entity: null, email: null, error: null };// Se cambia el id: null y se coloca el email
    }

    case fromActions.Types.SIGN_UP_EMAIL_SUCCESS: {
      return { ...state, loading: false, entity: action.user, email: action.email, error: null };// Se cambia el id: null y se coloca el email
    }

    case fromActions.Types.SIGN_UP_EMAIL_ERROR: {
      return { ...state, loading: false, entity: null, email: null, error: action.error };// Se cambia el id: null y se coloca el email
    }

    //Proceso 4
    case fromActions.Types.SIGN_OUT_EMAIL: {
      return { ...initialState };
    }

    case fromActions.Types.SIGIN_OUT_EMAIL_SUCCESS: {
      return { ...initialState };
    }

    case fromActions.Types.SIGIN_OUT_EMAIL_ERROR: {
      return { ...state, loading: false, entity: null, email: null, error: action.error };// Se cambia el id: null y se coloca el email
    }
    default: {
      return state;
    }
  }
}
