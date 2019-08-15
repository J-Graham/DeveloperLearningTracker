import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { TrainingInfoComponent } from './training-info.component';
import { ITraining } from 'src/app/models/Training';
import { TrainingsService } from '../trainings.service';
import { ActivatedRouteStub } from '../stubs/activated-route-stub';

describe('TrainingInfoComponent', () => {
  let component: TrainingInfoComponent;
  let fixture: ComponentFixture<TrainingInfoComponent>;
  let service: TrainingsService;
  let activatedRoute: ActivatedRouteStub;
  let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingInfoComponent],
      imports: [ReactiveFormsModule, RouterTestingModule.withRoutes([])],
      providers: [{ provide: ActivatedRoute, useClass: ActivatedRouteStub }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingInfoComponent);
    component = fixture.componentInstance;
    service = TestBed.get(TrainingsService);
    activatedRoute = TestBed.get(ActivatedRoute);
    router = TestBed.get(Router);
    activatedRoute.testParamMap = { trainingId: '1' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOninit', () => {
    it('should create reactive form with defaults', () => {
      activatedRoute.testParamMap = { trainingId: '0' };
      component.ngOnInit();
      expect(component.trainingForm.controls).toBeDefined();
    });
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

  describe('#saveForm', () => {
    it('should navigate to list when form is valid', () => {
      spyOn(router, 'navigate');
      component.ngOnInit();
      component.trainingForm.patchValue({ Name: 'Test Form' });
      component.saveForm();
      expect(router.navigate).toHaveBeenCalled();
    });
    it('should not navigate to list when form is in-valid', () => {
      spyOn(router, 'navigate');
      component.ngOnInit();
      component.saveForm();
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });
});
