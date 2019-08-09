import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { TrainingsRoutingModule } from './trainings-routing.module';
import { AvailableTrainingsListComponent } from './available-trainings-list/available-trainings-list.component';
import { Ng5SliderModule } from 'ng5-slider';

@NgModule({
  declarations: [AvailableTrainingsListComponent],
  imports: [CommonModule, TrainingsRoutingModule, DragDropModule, Ng5SliderModule],
})
export class TrainingsModule {}
