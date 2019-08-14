import { Component, OnInit } from '@angular/core';
import { ITraining } from 'src/app/models/Training';
import { TrainingsService } from '../trainings.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-training-info',
  styleUrls: ['./training-info.component.css'],
  templateUrl: './training-info.component.html',
})
export class TrainingInfoComponent implements OnInit {
  training: ITraining;

  constructor(private trainingService: TrainingsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('trainingId');
    this.trainingService.getTrainingById(id).subscribe((training) => {
      this.training = training;
    });
  }
}
