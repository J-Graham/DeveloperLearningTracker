import { TestBed, getTestBed, fakeAsync } from '@angular/core/testing';
import { TrainingsService } from './trainings.service';
import { ITraining } from '../models/Training';
import { of } from 'rxjs';
import { async } from 'q';

describe('TrainingsService', () => {
  let injector: TestBed;
  let service: TrainingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [TrainingsService],
    });
    injector = getTestBed();
    service = injector.get(TrainingsService);
  });

  describe('#getTrainings', () => {
    it('should return an Obeservable<ITraining[]>', () => {
      const mockTrainings: ITraining[] = [
        {
          Completed: false,
          DateCompleted: null,
          DateCreated: new Date('2019-08-08T18:19:31.294Z'),
          Id: 1,
          InProgress: false,
          Name: 'Reading Pragmatic Programmer 20th Edition',
          PercentageComplete: 55.0,
        },
        {
          Completed: false,
          DateCompleted: null,
          DateCreated: new Date('2019-08-08T18:19:31.294Z'),
          Id: 2,
          InProgress: false,
          Name: 'Learning Go',
          PercentageComplete: 55.0,
        },
      ];
      spyOn(service, 'getAllTrainings').and.returnValue(of(mockTrainings));

      service.getAllTrainings().subscribe((trainings) => {
        expect(trainings.length).toBe(2);
        expect(trainings).toEqual(mockTrainings);
      });
    });
  });

  describe('#getTrainingById', () => {
    it('should return an Training by Id', () => {
      const mockTrainings: ITraining[] = [
        {
          Completed: false,
          DateCompleted: null,
          DateCreated: new Date('2019-08-08T18:19:31.294Z'),
          Id: 1,
          InProgress: false,
          Name: 'Reading Pragmatic Programmer 20th Edition',
          PercentageComplete: 55.0,
        },
        {
          Completed: false,
          DateCompleted: null,
          DateCreated: new Date('2019-08-08T18:19:31.294Z'),
          Id: 2,
          InProgress: false,
          Name: 'Learning Go',
          PercentageComplete: 55.0,
        },
      ];
      spyOnProperty(service, 'trainings', 'get').and.returnValue(mockTrainings);

      service.getTrainingById(1).subscribe((training) => {
        expect(training.Id).toEqual(1);
        expect(training.Name).toEqual('Reading Pragmatic Programmer 20th Edition');
      });
    });
  });

  describe('#addTrainings', () => {
    it('should return an Obeservable<number>', (done: DoneFn) => {
      const mockTraining = {
        Completed: false,
        DateCompleted: null,
        DateCreated: new Date(),
        Id: 0,
        InProgress: false,
        Name: 'Learning Docker',
        PercentageComplete: 55.0,
      };
      service.addTraining(mockTraining).subscribe(() => {
        expect(service.trainings.length).toBe(4);
        done();
      });
    });
  });
  describe('#updateTrainings', () => {
    it('should return an nothing when updating a training', () => {
      const mockTraining = {
        Completed: false,
        DateCompleted: null,
        DateCreated: new Date('2019-08-08T18:19:31.294Z'),
        Id: 2,
        InProgress: false,
        Name: 'Learning Docker',
        PercentageComplete: 55.0,
      };

      service.updateTraining(mockTraining);
      expect(service.trainings.find((t) => t.Id === mockTraining.Id).Name).toBe('Learning Docker');
    });
    it(`should throw and error when trying to update training that isn't found`, () => {
      const mockTraining = {
        Completed: false,
        DateCompleted: null,
        DateCreated: new Date('2019-08-08T18:19:31.294Z'),
        Id: 9999,
        InProgress: false,
        Name: 'Learning Docker',
        PercentageComplete: 55.0,
      };

      expect(() => service.updateTraining(mockTraining)).toThrow(new Error(`No training found for Id: ${mockTraining.Id}`));
    });
  });

  describe('#markTrainingComplete', () => {
    it('should mark a training as completed', () => {
      const mockTraining = {
        Completed: false,
        DateCompleted: null,
        DateCreated: new Date(),
        Id: 2,
        InProgress: false,
        Name: 'Learning Docker',
        PercentageComplete: 55.0,
      };

      service.markTrainingComplete(mockTraining);
      const expectedTraining = service.trainings.find((t) => t.Id === mockTraining.Id);
      expect(expectedTraining.PercentageComplete).toBe(100.0);
      expect(expectedTraining.InProgress).toBe(false);
      // expect(expectedTraining.DateCompleted).toEqual(new Date());
    });

    it(`should throw and error when trying to update training that isn't found`, () => {
      const mockTraining = {
        Completed: false,
        DateCompleted: null,
        DateCreated: new Date('2019-08-08T18:19:31.294Z'),
        Id: 9999,
        InProgress: false,
        Name: 'Learning Docker',
        PercentageComplete: 55.0,
      };

      expect(() => service.markTrainingComplete(mockTraining)).toThrow(new Error(`No training found for Id: ${mockTraining.Id}`));
    });
  });
  it('should be created', () => {
    const service: TrainingsService = TestBed.get(TrainingsService);
    expect(service).toBeTruthy();
  });
});
