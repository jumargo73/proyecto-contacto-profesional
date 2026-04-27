import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceManagement } from './service-management/service-management';
import { CustomButtonComponent } from './elements/custom-button/custom-button';
import { CustomInputComponent } from './elements/custom-input/custom-input';
import { CustomSelectComponent } from './elements/custom-select/custom-select';

@NgModule({
  declarations: [ServiceManagement],
  imports: [CommonModule,CustomInputComponent,CustomButtonComponent, CustomSelectComponent],
  exports: [
    // ✅ EXPORTA AMBOS PARA QUE APP-MODULE LOS VEA
    ServiceManagement,
    CustomInputComponent,
    CustomButtonComponent
  ]
})
export class ComponentsModule {}
