import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilesUploadComponent } from './files-upload.component';

@Directive({
  selector: '[appFilesUpload]'
})
export class FilesUploadDirective {

  //Popiedades importantes Control de Multiples archivo o solo Uno - Crop edicion de la imagen
  @Input() multiple!: boolean;
  @Input() crop!: boolean;

  //Url para el almacenamiento de las jpgs
  @Output() changed = new EventEmitter<string | string[]>();

  //Intancio el Serializable popup
  constructor(private dialog: MatDialog) { }

  //Evento de tipo HostListenet
  @HostListener('click', ['event']) onClick() {
    this.openDialog();

  }

  //Leyendo el HostListener
  private openDialog(): void {

    //Cuando abra
    const dialogRef = this.dialog.open(FilesUploadComponent, {
      width: '550px',
      height: '500px',
      data: {
        multiple: this.multiple,
        crop: this.crop
      }
    })

    //Coleccion de jpgs que se subieron al servidor
    dialogRef.afterClosed().subscribe(result => {
      this.changed.emit(result || null);
    })

  }

}
