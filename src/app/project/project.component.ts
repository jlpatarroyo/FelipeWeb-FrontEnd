import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Project, ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  constructor(private projectService: ProjectService) {}

  projects: Project[];

  isCreating: Boolean;

  isUpdating: Boolean;

  editingIndex:number;

  ngOnInit(): void {
    this.getProjects();
    this.setCreating(false);
    this.setUpdating(false);
    this.setEditingIndex(-1);
  }

  private getProjects() {
    this.projectService.getAllProjects().subscribe((res) => {
      this.projects = res;  
    });
  }

  setCreating(_isCreating:Boolean) {
    this.isCreating = _isCreating;
  }

  setEditingIndex(_editingIndex:number){
    this.editingIndex = _editingIndex;
  }

  removeProject(index: number) {
    const project = this.projects[index];
    this.projectService.deleteProject(project.name).subscribe(() => {
      this.getProjects();
      this.setCreating(false);
      this.setUpdating(false);
    });
  }

  setUpdating(_isUpdating:Boolean) {
    this.isUpdating = _isUpdating;
  }
}
