import { EntityPhotoModule } from './entity-photo/entity-photo.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EntityPhotoModule
  ],
  exports: [
    EntityPhotoModule
  ]
})
export class LayoutsModule { }
