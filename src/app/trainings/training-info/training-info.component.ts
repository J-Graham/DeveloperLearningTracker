import { Component, OnInit } from '@angular/core';
import { ITraining } from 'src/app/models/Training';
import { TrainingsService } from '../trainings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-training-info',
  styleUrls: ['./training-info.component.css'],
  templateUrl: './training-info.component.html',
})
export class TrainingInfoComponent implements OnInit {
  training: ITraining;
  trainingForm: FormGroup;

  get fc(): {
    [key: string]: AbstractControl;
  } {
    return this.trainingForm.controls;
  }

  constructor(private trainingService: TrainingsService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('trainingId');
    this.trainingService.getTrainingById(id).subscribe((training) => {
      this.training = training;
    });
    this.trainingForm = this.getNewTrainingForm();
  }

  getNewTrainingForm(): FormGroup {
    return this.fb.group({ Name: ['', Validators.required] });
  }

  saveForm(): void {
    if (this.trainingForm.valid) {
      let newTraining = Object.assign(this.trainingService.getNewTraining(), this.trainingForm.value);
      this.trainingService.addTraining(newTraining).subscribe(() => {
        this.router.navigate(['trainings']);
      });
    }
  }
}
