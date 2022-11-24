import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromList from './save/save.reducer';
import { SaveEffects } from './save/save.effects';

export interface InmuebleState {
  list: fromList.ListState;
}

export const reducers: ActionReducerMap<InmuebleState> = {
  list: fromList.reducer
}

export const effects: any = [
  SaveEffects
]

export const getInmuebleState = createFeatureSelector<InmuebleState>('inmueble');



