import { Component, OnInit } from '@angular/core';
import { ITraining } from 'src/app/models/Training';
import { TrainingsService } from '../trainings.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-training-info',
  styleUrls: ['./training-info.component.css'],
  templateUrl: './training-info.component.html',
})
export class TrainingInfoComponent implements OnInit {
  training: ITraining;
  trainingForm: FormGroup;

  constructor(private trainingService: TrainingsService, private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('trainingId');
    this.trainingService.getTrainingById(id).subscribe((training) => {
      this.training = training;
    });
    this.trainingForm = this.getNewTrainingForm();
  }

  getNewTrainingForm(): FormGroup {
    return this.fb.group({});
  }
}
