import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TrainingsModule } from './trainings/trainings.module';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, NavbarComponent],
  imports: [BrowserModule, HttpClientModule, TrainingsModule, RouterModule, SweetAlert2Module.forRoot()],
  providers: [],
})
export class AppModule {}
