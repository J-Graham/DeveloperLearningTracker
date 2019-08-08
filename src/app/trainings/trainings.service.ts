import { Injectable } from '@angular/core';
import { ITraining } from '../models/Training';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

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
      InProgress: true,
      Name: 'Learning Go',
      PercentageComplete: 0.0,
    },
  ];

  // This is here for unit testing purposes
  get trainings(): ITraining[] {
    return this._trainings;
  }

  constructor() {}

  getAllTrainings(): Observable<ITraining[]> {
    return of(this._trainings);
  }

  getTrainingsInProgress(): Observable<ITraining[]> {
    return of(this._trainings.filter((t) => t.InProgress === true));
  }

  getTrainingsNotInProgress(): Observable<ITraining[]> {
    return of(this._trainings.filter((t) => t.InProgress === false));
  }

  addTraining(training: ITraining): Observable<number> {
    return Observable.create().pipe(
      map(() => {
        training.DateCreated = new Date();
        training.Id =
          Math.max.apply(
            Math,
            this._trainings.map((t) => {
              return t.Id;
            }),
          ) + 1;
        this._trainings.push(training);
        return training.Id;
      }),
    );
  }

  updateTraining(training: ITraining): void {
    const index = this._trainings.findIndex((t) => t.Id === training.Id);

    if (index && index > 0) {
      this._trainings[index] = training;
    } else {
      throw new Error(`No training found for Id: ${training.Id}`);
    }
  }

  markTrainingComplete(training): void {
    const index = this._trainings.findIndex((t) => t.Id === training.Id);

    if (index && index > 0) {
      this._trainings[index].InProgress = false;
      this._trainings[index].DateCompleted = new Date();
      this._trainings[index].PercentageComplete = 100.0;
    } else {
      throw new Error(`No training found for Id: ${training.Id}`);
    }
  }

  markTrainingInProgress(training): void {
    const index = this._trainings.findIndex((t) => t.Id === training.Id);

    if (index && index > 0) {
      this._trainings[index].InProgress = true;
    } else {
      throw new Error(`No training found for Id: ${training.Id}`);
    }
  }
}
