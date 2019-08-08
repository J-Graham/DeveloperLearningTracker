export interface ITraining {
  Id: number;
  Completed: boolean;
  DateCreated: Date;
  DateCompleted?: Date;
  InProgress: boolean;
  Name: string;
  PercentageComplete: number;
}
