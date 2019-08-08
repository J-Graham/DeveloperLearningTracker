import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableTrainingsListComponent } from './available-trainings-list.component';

describe('AvailableTrainingsListComponent', () => {
  let component: AvailableTrainingsListComponent;
  let fixture: ComponentFixture<AvailableTrainingsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableTrainingsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableTrainingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
