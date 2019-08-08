import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingsRoutingModule } from './trainings-routing.module';
import { AvailableTrainingsListComponent } from './available-trainings-list/available-trainings-list.component';

@NgModule({
  declarations: [AvailableTrainingsListComponent],
  imports: [CommonModule, TrainingsRoutingModule],
})
export class TrainingsModule {}
