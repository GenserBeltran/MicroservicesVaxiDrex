import { Create } from './../../store/save/save.actions';
import { InmuebleCreateRequest } from './../../store/save/save.models';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as fromRoot from '../../../../store';
import * as fromList from '../../store/save';


@Component({
  selector: 'app-inmueble-nuevo',
  templateUrl: './inmueble-nuevo.component.html',
  styleUrls: ['./inmueble-nuevo.component.scss']
})
export class InmuebleNuevoComponent implements OnInit {

  //Variable para el Spinner
  loading$!: Observable<boolean | null>;

  //Variable urlImagen
  photoLoaded!: string;

  constructor(
    private store: Store<fromRoot.State>//Instanciando el store

  ) { }

  ngOnInit(): void {
  }

  registrarInmueble(form: NgForm): void {

    if (form.valid) {
      this.loading$ = this.store.pipe(select(fromList.getLoading));

      //objeto de tipo request
      const inmuebleCreateRequest: fromList.InmuebleCreateRequest = {
        nombre: form.value.nombre,
        picture: this.photoLoaded,
        precio: Number(form.value.precio),
        direccion: form.value.direccion,
      }
      this.store.dispatch(new fromList.Create(inmuebleCreateRequest));
    }
  }

  //Metrodo que recibe la URL de la jpg
  onFilesChanged(url: any): void {
    if (url) {
      this.photoLoaded = url;
    }
  }
}
