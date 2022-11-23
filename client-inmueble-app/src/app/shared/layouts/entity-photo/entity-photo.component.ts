import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-entity-photo',
  templateUrl: './entity-photo.component.html',
  styleUrls: ['./entity-photo.component.scss']
})
export class EntityPhotoComponent implements OnInit {

  //Url parametro de entrada
  @Input() photoURL!: string;

  constructor(
    //Se inicializa el DOM
    private sanitizer: DomSanitizer,// con este atributo parseamos la imagen del servidor
  ) { }

  ngOnInit(): void {
  }

  get safePhotoURL(): SafeStyle | null {
    return this.photoURL ? this.sanitizer.bypassSecurityTrustStyle(`url(${this.photoURL})`) : null; //Evaluado si es nulo si no lo es se desplaga la URL dentro del conteneodr
  }

}
