import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';//Capturar la data por el dialog


export interface DialogData {
  multiple: boolean;
  crop: boolean;
}


@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.scss']
})
export class FilesUploadComponent implements OnInit {

  files: File[] = [];//Areglo de archivos capturtalos (temp)
  imageFile!: File;
  isError!: boolean;

  //Areglo de url para acceso al cliente
  filesURLs: string[] = [];

  isHovering !: boolean;

  constructor(
    private dialogRef: MatDialogRef<FilesUploadComponent>, //Instanciar clase de dialog
    @Inject(MAT_DIALOG_DATA) public data: DialogData //Inyeccion de la data que ingresa al dialos
  ) { }

  ngOnInit(): void {
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  //Metodo se dispara al (soltar) subir la imagen al servidor
  onDrop(files: FileList): void {
    this.dropGeneral(files);
  }

  onDropFile(event: FileList | any): void {
    this.dropGeneral(event.target.files);
  }

  dropGeneral(files: FileList): void {
    this.isError = false;

    if (this.data.crop && files.length > 1) {
      this.isError = true;
      return;
    }
    //Si las condiciones son aproadas y correctas el arreglo se agrega en memoria
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i) as File);
    }
    //Imprima los archivos selecionado
    console.log(files);

  }

  onUploadComplete(url: string): void {
    this.filesURLs.push(url);
  }

  onComplete(): void {
    const res = this.data.multiple ? this.filesURLs : this.filesURLs[0];
    this.dialogRef.close(res);
}

  onClose(): void {
    this.dialogRef.close();
  }
}
