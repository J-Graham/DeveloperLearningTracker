import { Injectable } from '@angular/core';
import { ITraining } from '../models/Training';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export const newTraining: ITraining = {
  Completed: false,
  DateCreated: new Date(),
  Id: 0,
  InProgress: false,
  Name: null,
  PercentageComplete: 0.0,
};

@Injectable({
  providedIn: 'root',
})
export class TrainingsService {
  private _trainings: ITraining[] = [
    {
      Completed: false,
      DateCompleted: null,
      DateCreated: new Date(),
      Id: 1,
      InProgress: false,
      Name: 'Reading Pragmatic Programmer 20th Edition',
      PercentageComplete: 0.0,
    },
    {
      Completed: false,
      DateCompleted: null,
      DateCreated: new Date(),
      Id: 2,
      InProgress: false,
      Name: 'Micro Service .Net Core',
      PercentageComplete: 0.0,
    },
    {
      Completed: false,
      DateCompleted: null,
      DateCreated: new Date(),
      Id: 3,
      InProgress: true,
      Name: 'Learning Go',
      PercentageComplete: 50.0,
    },
  ];

  // This is here for unit testing purposes
  get trainings(): ITraining[] {
    return this._trainings;
  }

  constructor() {}

  getNewTraining(): ITraining {
    return { ...newTraining };
  }

  getAllTrainings(): Observable<ITraining[]> {
    return of(this.trainings);
  }

  getTrainingById(trainingId: number): Observable<ITraining> {
    return of(
      this.trainings.find((t) => {
        return t.Id === trainingId;
      }),
    );
  }

  getTrainingsInProgress(): Observable<ITraining[]> {
    return of(this.trainings.filter((t) => t.InProgress === true));
  }

  getTrainingsNotInProgress(): Observable<ITraining[]> {
    return of(this._trainings.filter((t) => t.InProgress === false && t.Completed === false));
  }

  addTraining(training: ITraining): Observable<number> {
    const dateCreated = new Date();
    const id =
      Math.max.apply(
        Math,
        this.trainings.map((t) => {
          return t.Id;
        }),
      ) + 1;

    return of(this._trainings.push(Object.assign(training, { DateCreated: dateCreated, Id: id }))).pipe(map(() => id));
  }

  updateTraining(training: ITraining): void {
    const index = this._trainings.findIndex((t) => t.Id === training.Id);

    if (index >= 0) {
      this._trainings[index] = training;
    } else {
      throw new Error(`No training found for Id: ${training.Id}`);
    }
  }

  markTrainingComplete(training): Observable<number> {
    const index = this.trainings.findIndex((t) => t.Id === training.Id);

    if (index >= 0) {
      this._trainings[index].InProgress = false;
      this._trainings[index].DateCompleted = new Date();
      this._trainings[index].PercentageComplete = 100.0;
      this._trainings[index].Completed = true;
    } else {
      throw new Error(`No training found for Id: ${training.Id}`);
    }

    return of(this._trainings[index].Id);
  }

  deleteTraining(trainingId: number): void {
    const index = this.trainings.findIndex((t) => t.Id === trainingId);

    if (index >= 0) {
      this.trainings.splice(index, 1);
    } else {
      throw new Error(`No training found for Id: ${trainingId}`);
    }
  }
}
