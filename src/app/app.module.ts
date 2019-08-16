import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TrainingsModule } from './trainings/trainings.module';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SaConfirmDirective } from './directives/confirm.directive';
import { SwalComponent, SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, NavbarComponent],
  entryComponents: [SwalComponent],
  imports: [BrowserModule, HttpClientModule, TrainingsModule, RouterModule],
  providers: [],
})
export class AppModule {}
