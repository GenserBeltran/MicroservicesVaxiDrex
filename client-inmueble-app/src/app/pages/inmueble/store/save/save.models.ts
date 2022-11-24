import { Inmueble } from '../../../../models/backend/inmueble/index';
export { Inmueble as InmuebleResponse } from '../../../../models/backend/inmueble'; //Exportando el response

export type InmuebleCreateRequest = Omit<Inmueble, 'id' | 'fechaCreacion'>;
