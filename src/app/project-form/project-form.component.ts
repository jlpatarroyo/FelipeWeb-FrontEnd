import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Project, ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
})
export class ProjectFormComponent implements OnInit {
  constructor(private projectService: ProjectService) {}

  hasFinished:Boolean;

  projectForm = new FormGroup({
    name: new FormControl('',[
      Validators.required,
      Validators.minLength(1)
    ]),
    description: new FormControl('',[
      Validators.required
    ]),
    startDate: new FormControl('',[
      Validators.required
    ]),
    finishDate: new FormControl('')
  });

  ngOnInit() {}

  getToday(): String {
    return new Date().toISOString().split('T')[0];
  }

  onSubmit(){
    console.log(this.projectForm.value);
  }
}
