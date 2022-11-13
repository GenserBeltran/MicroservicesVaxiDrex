import { NotificacionModule } from './services/notificacion/notificacion.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SpinnerComponent } from './shared/indicators/spinner/spinner.component';
import { IndicatorsModule } from './shared/indicators'; //Asi solo importo al Indicator y no a todos en caso que solo sea shared
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupsModule } from './shared/popups';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),

    AngularFireModule.initializeApp(environment.firebase),

    IndicatorsModule,
    BrowserAnimationsModule,
    PopupsModule,
    NotificacionModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
