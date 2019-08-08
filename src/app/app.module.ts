import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TrainingsModule } from './trainings/trainings.module';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, TrainingsModule],
  providers: [],
})
export class AppModule {}
