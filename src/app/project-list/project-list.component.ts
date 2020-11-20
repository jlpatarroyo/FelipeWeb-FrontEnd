import { Component, OnInit } from '@angular/core';
import { Project, ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  constructor(private projectService: ProjectService) {}

  projects: Project[];

  ngOnInit(): void {
    this.getProjects();
  }

  private getProjects() {
    this.projectService.getAllProjects().subscribe((res) => {
      this.projects = res;
    });
  }

  removeProject(index: number) {
    const project = this.projects[index];
    if (
      confirm("Are you sure you want to delete '" + project.name + "' project?")
    ) {
      this.projectService.deleteProject(project.name).subscribe(() => {
        this.getProjects();
      });
    }
  }
}
