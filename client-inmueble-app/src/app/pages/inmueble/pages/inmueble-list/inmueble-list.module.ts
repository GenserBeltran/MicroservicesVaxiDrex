import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerModule } from './../../../../shared/indicators/';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InmuebleListRoutingModule } from './inmueble-list-routing.module';
import { InmuebleListComponent } from './inmueble-list.component';


@NgModule({
  declarations: [
    InmuebleListComponent
  ],
  imports: [
    CommonModule,
    InmuebleListRoutingModule,

    SpinnerModule,
    MatButtonModule,
    MatCardModule,

  ]
})
export class InmuebleListModule { }
