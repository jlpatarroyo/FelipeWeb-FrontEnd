import { Component, OnInit } from '@angular/core';
import { Project, ProjectService } from '../services/project.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  constructor(private projectService: ProjectService) {}

  projects: Project[];
  editingIndex:number;

  creating: Boolean;
  updating: Boolean;

  projectForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(0),
      Validators.maxLength(100),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(5000),
    ]),
    date: new FormControl('', [Validators.required]),
  });


  ngOnInit(): void {
    this.getProjects();
    this.creating = false;
    this.updating = false;
  }

  onProjectSubmit() {
    const result = this.projectForm.value;
    const new_project = {
      name: result.name,
      description: result.description,
      date: result.date,
    };
    if(this.creating){
      console.log("Creating");
      this.projectService.postProject(new_project).subscribe(() => {
        this.getProjects();
        this.cancel();
      });
    }else if(this.updating){
      console.log("Updating");
      const curr_project = this.projects[this.editingIndex];
      this.projectService.updateProject(curr_project.name, new_project)
      .subscribe(() => {
        this.getProjects();
        this.cancel();
      });
    }
  }

  private getProjects() {
    this.projectService.getAllProjects().subscribe((res) => {
      this.projects = res;
    });
  }

  setCreating() {
    this.creating = true;
    this.updating = false;
  }

  cancel(): void {
    this.projectForm.reset();
    this.creating = false;
    this.updating = false;
    this.editingIndex = -1;
  }

  getToday(): String {
    return new Date().toISOString().split('T')[0];
  }

  removeProject(index: number) {
    const project = this.projects[index];
    this.projectService.deleteProject(project.name).subscribe(() => {
      this.projects.splice(index, 1);
    });
  }

  setUpdating(index:number) {
    const curr_project = this.projects[index];
    const curr_date:Date = moment(curr_project.date).toDate();
    this.updating = true;
    this.creating = false;
    this.editingIndex = index;  
    this.projectForm.setValue({
      name: curr_project.name,
      description: curr_project.description,
      date: curr_date.toISOString().split('T')[0]
    });
  }
}
