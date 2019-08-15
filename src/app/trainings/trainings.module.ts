import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { TrainingsRoutingModule } from './trainings-routing.module';
import { AvailableTrainingsListComponent } from './available-trainings-list/available-trainings-list.component';
import { Ng5SliderModule } from 'ng5-slider';
import { TrainingInfoComponent } from './training-info/training-info.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AvailableTrainingsListComponent, TrainingInfoComponent],
  imports: [CommonModule, ReactiveFormsModule, TrainingsRoutingModule, DragDropModule, Ng5SliderModule, FontAwesomeModule],
})
export class TrainingsModule {}
