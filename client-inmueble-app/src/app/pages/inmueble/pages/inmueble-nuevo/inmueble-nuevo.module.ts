import { EntityPhotoModule } from './../../../../shared/layouts/';
import { SpinnerModule } from './../../../../shared/indicators/';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InmuebleNuevoRoutingModule } from './inmueble-nuevo-routing.module';
import { InmuebleNuevoComponent } from './inmueble-nuevo.component';
import { MatInputModule } from '@angular/material/input';
import { PopupsModule } from 'src/app/shared/popups';


@NgModule({
  declarations: [
    InmuebleNuevoComponent
  ],
  imports: [
    CommonModule,
    InmuebleNuevoRoutingModule,
    MatToolbarModule,//Barra que indica en qeu funcionalidad me encuentro
    MatIconModule,
    MatFormFieldModule,//Cajas de texto
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatCardModule,//Container
    FlexLayoutModule,//Manejo de espacion in the Container
    SpinnerModule,
    EntityPhotoModule,
    PopupsModule

  ]
})
export class InmuebleNuevoModule { }
