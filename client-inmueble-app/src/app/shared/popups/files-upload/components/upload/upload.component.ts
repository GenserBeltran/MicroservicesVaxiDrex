import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { UploadTaskSnapshot } from '@angular/fire/compat/storage/interfaces';
import { async } from '@firebase/util';
import { finalize, lastValueFrom, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {

  @Input() file !: File;
  @Output() completed = new EventEmitter<string>();

  //Monitorea la subida de archivos a Firebase
  task !: AngularFireUploadTask;

  snapshot$ !: Observable<UploadTaskSnapshot | undefined>;

  percentage$ !: Observable<number | undefined>;

  //Url que debo entregar al cliente de la jpg
  downloadURL !: string;

  private destroy = new Subject<void>();

  constructor(private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.startUpload();//Inicializo el metodo aqui para que se dispare
  }

  //Metodo para almacenar el paht (Se generara una carpeta por cada archivo siubido)
  startUpload(): void {
    //formato del paht: image/20251123_mifoto.jpg si fuera un word sera docx/234134_document.docx
    const path = `${this.file.type.split('/')[0]}/${Date.now()}_${this.file.name}`;

    const storageRef = this.storage.ref(path);//Inicializando el paht
    this.task = this.storage.upload(path, this.file);//Tarea de subida del paht
    this.percentage$ = this.task.percentageChanges();//Porcentaje que se sube el archivo
    this.snapshot$ = this.task.snapshotChanges() as Observable<UploadTaskSnapshot | undefined>//Sanpshopt del estado actual de la imagen
    this.snapshot$.pipe(
      //Despleegar esl status de la subida del archivo
      takeUntil(this.destroy),
      finalize(async () => {
        const storageRefObservable$ = storageRef.getDownloadURL();//El objetivo de subir la imagen es que firebase me devuelva la url
        this.downloadURL = await lastValueFrom(storageRefObservable$);
        this.completed.next(this.downloadURL);//Termina la operacion del path y lo setea

      })
    ).subscribe();//Para que se ejecute el Pipe agrego el subscribe
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete()
  }


}
