import { SpinnerModule } from './spinner/spinner.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicatorsComponent } from './indicators.component';



@NgModule({
  declarations: [
    IndicatorsComponent
  ],
  imports: [
    CommonModule,
    SpinnerModule
  ],
  export: [
    SpinnerModule
  ]
})
export class IndicatorsModule { }
