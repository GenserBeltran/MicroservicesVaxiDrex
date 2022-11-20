import { SpinnerModule } from './../../../../shared/indicators';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule,

    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    FlexLayoutModule,
    MatInputModule,
    SpinnerModule
  ]
})
export class RegistrationModule { }
