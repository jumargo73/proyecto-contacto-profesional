import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from './elements/custom-button/custom-button';
import { CustomInputComponent } from './elements/custom-input/custom-input';
import { CustomSelectComponent } from './elements/custom-select/custom-select';

@NgModule({
  declarations: [],
  imports: [CommonModule,CustomInputComponent,CustomButtonComponent, CustomSelectComponent],
  exports: [
    // ✅ EXPORTA AMBOS PARA QUE APP-MODULE LOS VEA
    CustomSelectComponent,
    CustomInputComponent,
    CustomButtonComponent
  ]
})
export class ComponentsModule {}
