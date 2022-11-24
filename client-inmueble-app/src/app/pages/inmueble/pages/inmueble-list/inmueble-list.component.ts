import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../../store';
import * as fromList from '../../store/save';
import { InmuebleResponse } from '../../store/save';

@Component({
  selector: 'app-inmueble-list',
  templateUrl: './inmueble-list.component.html',
  styleUrls: ['./inmueble-list.component.scss']
})
export class InmuebleListComponent implements OnInit {

  inmuebles$!: Observable<InmuebleResponse[] | null>;
  loading$!: Observable<boolean | null>;

  pictureDefault: string = "https://firebasestorage.googleapis.com/v0/b/edificacion-app.appspot.com/o/image%2F1637099019171_O5986058_0.jpg?alt=media&token=0a146233-d63b-4702-b28d-6eaddf5e207a"


  constructor(
    private store: Store<fromRoot.InmuebleState>//Inicializando el Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new fromList.Read());//Dispara evento para que haga la consulta al servidor y devuelva la data
    this.loading$ = this.store.pipe(select(fromList.getLoading));
    this.inmuebles$ = this.store.pipe(select(fromList.getInmuebles));//obtengo la data en el store global de angular
  }

}
