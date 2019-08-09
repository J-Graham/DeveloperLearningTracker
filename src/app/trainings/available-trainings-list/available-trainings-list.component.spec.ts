import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { AvailableTrainingsListComponent } from './available-trainings-list.component';
import { TrainingsService } from '../trainings.service';
import { ITraining } from 'src/app/models/Training';
import { of } from 'rxjs/internal/observable/of';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Ng5SliderModule } from 'ng5-slider';

describe('AvailableTrainingsListComponent', () => {
  let injector: TestBed;
  let component: AvailableTrainingsListComponent;
  let fixture: ComponentFixture<AvailableTrainingsListComponent>;
  let service: TrainingsService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AvailableTrainingsListComponent],
      imports: [DragDropModule, Ng5SliderModule],
      providers: [TrainingsService],
    }).compileComponents();
  }));

  beforeEach(() => {
    injector = getTestBed();
    fixture = TestBed.createComponent(AvailableTrainingsListComponent);
    component = fixture.componentInstance;
    service = injector.get(TrainingsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOninit', () => {
    it('should populate the in progress trainings list', () => {
      const mockTrainingsInProgress: ITraining[] = [
        {
          Completed: false,
          DateCompleted: null,
          DateCreated: new Date(),
          Id: 1,
          InProgress: true,
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

      spyOn(service, 'getTrainingsInProgress').and.returnValue(of(mockTrainingsInProgress));
      component.ngOnInit();
      expect(component.trainingsInProgress.length).toBe(2);
      expect(component.trainingsInProgress).toEqual(mockTrainingsInProgress);
    });
    it('should populate the trainings available list', () => {
      const mockTrainingsInProgress: ITraining[] = [
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
          Name: 'Learning Go',
          PercentageComplete: 0.0,
        },
      ];

      spyOn(service, 'getTrainingsNotInProgress').and.returnValue(of(mockTrainingsInProgress));
      component.ngOnInit();
      expect(component.trainingsNotInProgress.length).toBe(2);
      expect(component.trainingsNotInProgress).toEqual(mockTrainingsInProgress);
    });
  });

  describe('#markComplete', () => {
    it('should set training % to 100 and mark item completed', async(() => {
      const mockTrainingsInProgress: ITraining[] = [
        {
          Completed: false,
          DateCompleted: null,
          DateCreated: new Date(),
          Id: 1,
          InProgress: true,
          Name: 'Reading Pragmatic Programmer 20th Edition',
          PercentageComplete: 0.0,
        },
        {
          Completed: false,
          DateCompleted: null,
          DateCreated: new Date(),
          Id: 2,
          InProgress: false,
          Name: 'Learning Go',
          PercentageComplete: 0.0,
        },
      ];

      spyOn(service, 'getTrainingsInProgress').and.returnValue(of(mockTrainingsInProgress));
      spyOn(service, 'markTrainingComplete').and.callThrough();
      component.ngOnInit();
      const startingTrainings = [...component.trainingsInProgress];
      component.markComplete(mockTrainingsInProgress[0], 0);
      fixture.detectChanges();
      expect(service.markTrainingComplete).toHaveBeenCalled();
      expect(component.trainingsInProgress.length).toBeLessThan(startingTrainings.length);
      expect(service.trainings[0].Completed).toBe(true);
      expect(service.trainings[0].DateCompleted).not.toBeNull();
    }));
  });
});
