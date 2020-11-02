import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  editing: Boolean;

  projectForm = new FormGroup({
    name: new FormControl('',[
      Validators.required,
      Validators.minLength(0),
      Validators.maxLength(100)
    ]),
    description: new FormControl('',[
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(5000)
    ]),
    date: new FormControl('',[
      Validators.required
    ])
  });

  onSubmit() {
    const result = this.projectForm.value;
    const project = {
      name: result.name,
      description: result.description,
      date: result.date
    };
    this.projectService.postProject(project)
    .subscribe(() => {
      this.getProjects();
    })
  }

  ngOnInit(): void {
    this.getProjects();
    this.editing = false;
  }

  private getProjects(){
    this.projectService.getAllProjects()
    .subscribe(res => {
      this.projects = res;
    })
  }

  setEditing(p_editing: Boolean) {
    this.editing = p_editing;
  }

  cancelEditing():void{
    this.projectForm.reset();
    this.setEditing(false);
  }

  validateDate():Boolean{
    var rta = true;
    const input_date=this.projectForm.value.date;
    var formatted_date = moment(input_date, 'YYYY-MM-DD');
    if(!formatted_date){
      rta = false;
    }
    return rta;
  }

  getToday():String{
    return new Date().toISOString().split('T')[0];
  }

  removeProject(index:number){
    const project = this.projects[index];
    this.projectService.deleteProject(project.name)
    .subscribe(result => {
      console.log("Deleting project: " + result);
      this.projects.splice(index,1);
    });
  }
}
