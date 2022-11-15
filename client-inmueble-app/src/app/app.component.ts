import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NotificacionService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  //Segun el estado boleano muestra el spiner
  showSpinner = false;

  title = 'client-inmueble-app';

  constructor(
    private fs: AngularFirestore,
    private notificacion: NotificacionService
  ) {
  }

  ngOnInit() {
    this.fs.collection('test').stateChanges().subscribe(personas => {
      console.log(personas.map(x => x.payload.doc.data()))
    })
  }

  onToggleSpinner(): void {
    this.showSpinner = !this.showSpinner;
  }

  //metodo que me devuelve la url de las imagenes subidas par aluego agrebar a la DB
  onFilesChanged(urls: string | string[]): void {
    console.log('urls', urls);
  }

  //Metodo para mensaje success
  onSuccess(): void {
    this.notificacion.success("El procediminento fue exitoso");
  }

  //Metodo para mensaje error
  onError(): void {
    this.notificacion.error("Se encontraron errores en el proceso");
  }

}
