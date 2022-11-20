import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective {

  //Archivo cuando se seleciona y se envia al contenedor grafico
  @Output() dropped = new EventEmitter<FileList>();

  @Output() hovered = new EventEmitter<boolean>();
  //Evento hover cuando el curso esta dentro del contenedor grafico se activara un evento

  constructor() { }

  //Listener (3) para qeu detecte esto eventos

  //Cae la imagen
  @HostListener('drop', ['$event']) onDrop($event: any) {
    $event.preventDefault(); //pREVENIR QUE NO HAGA UN submit (un f5)
    this.dropped.emit($event.dataTransfer.files); //Paso los archivos del evento
    this.hovered.emit(false); //Cuando  ya se solto el objeto
  }

  //Arrastrar la jpg
  @HostListener('dragover', ['$event']) onDragOver($event: any) {
    $event.preventDefault();
    this.hovered.emit(true);
  }
  //Salir de arrastras la jpg
  @HostListener('dragleave', ['$event']) onDragLeave($event: any) {
    $event.preventDefault();
    this.hovered.emit(false);

  }

}
