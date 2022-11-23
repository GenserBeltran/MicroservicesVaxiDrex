import { createSelector } from "@ngrx/store";
import { getInmuebleState, InmuebleState } from '../index'; //A  nivel de store

import { ListState } from "./save.reducer";
import { state } from '@angular/animations';

//Funcion
export const getListState = createSelector(
  getInmuebleState,
  (state: InmuebleState) => state.list
)

export const getLoading = createSelector(
  getListState,
  (state: ListState) => state.loading
)
