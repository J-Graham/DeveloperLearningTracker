import { Component, OnInit } from '@angular/core';
import { ITraining } from 'src/app/models/Training';
import { TrainingsService } from '../trainings.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Options } from 'ng5-slider';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-available-trainings-list',
  styleUrls: ['./available-trainings-list.component.css'],
  templateUrl: './available-trainings-list.component.html',
})
export class AvailableTrainingsListComponent implements OnInit {
  trainingsInProgress: ITraining[];
  trainingsNotInProgress: ITraining[];
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;
  dragging = false;
  sliderOptions: Options = {
    ceil: 100,
    floor: 0,
  };

  constructor(private trainingService: TrainingsService) {}

  ngOnInit(): void {
    forkJoin(this.trainingService.getTrainingsInProgress(), this.trainingService.getTrainingsNotInProgress()).subscribe((trainingReturns) => {
      const [trainingsInProgress, trainingsNotInProgress] = trainingReturns;
      this.trainingsInProgress = trainingsInProgress;
      this.trainingsNotInProgress = trainingsNotInProgress;
    });
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.flipProgress(event);
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  private flipProgress(event: CdkDragDrop<string[], string[]>): void {
    ((event.previousContainer.data as any) as ITraining)[event.previousIndex].InProgress = !((event.previousContainer.data as any) as ITraining)[event.previousIndex].InProgress;
  }

  removeTraining(trainingID: number): void {
    try {
      this.trainingService.deleteTraining(trainingID);
    } catch (e) {
      console.error(`Couldn't delete record: ${e};
      }`);
    }
    this.trainingService.getTrainingsNotInProgress().subscribe((trainings) => {
      this.trainingsNotInProgress = trainings;
    });
  }

  markComplete(training: ITraining, index: number): void {
    this.trainingService.markTrainingComplete(training).subscribe((trainingID) => {
      this.trainingsInProgress = this.trainingsInProgress.filter((tip) => {
        return tip.Id !== trainingID;
      });
    });
  }
}
