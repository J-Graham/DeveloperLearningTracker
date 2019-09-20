import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwalComponent, SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SaConfirmDirective } from './directives/confirm.directive';

@NgModule({
  declarations: [SaConfirmDirective],
  entryComponents: [SwalComponent],
  exports: [SaConfirmDirective],
  imports: [CommonModule, SweetAlert2Module],
})
export class ConfirmationModule {}
