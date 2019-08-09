import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvailableTrainingsListComponent } from './available-trainings-list/available-trainings-list.component';

const routes: Routes = [{ path: 'trainings', component: AvailableTrainingsListComponent }, { path: '', component: AvailableTrainingsListComponent }];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class TrainingsRoutingModule {}
