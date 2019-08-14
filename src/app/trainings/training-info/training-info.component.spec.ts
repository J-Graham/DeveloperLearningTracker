import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingInfoComponent } from './training-info.component';
import { ITraining } from 'src/app/models/Training';
import { TrainingsService } from '../trainings.service';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../stubs/activated-route-stub';

describe('TrainingInfoComponent', () => {
  let component: TrainingInfoComponent;
  let fixture: ComponentFixture<TrainingInfoComponent>;
  let service: TrainingsService;
  let activatedRoute: ActivatedRouteStub;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingInfoComponent],
      providers: [{ provide: ActivatedRoute, useClass: ActivatedRouteStub }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingInfoComponent);
    component = fixture.componentInstance;
    service = TestBed.get(TrainingsService);
    activatedRoute = TestBed.get(ActivatedRoute);
    activatedRoute.testParamMap = { trainingId: '1' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOninit', () => {
    it('should populate the training object', () => {
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

      component.ngOnInit();
      expect(component.training.Id).toBe(1);
      expect(component.training).toEqual(mockTrainings[0]);
    });
  });
});
