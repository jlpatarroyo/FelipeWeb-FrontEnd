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

  @Input() isUpdating: Boolean;
  @Output() isUpdatingChange = new EventEmitter();

  @Input() isCreating: Boolean;
  @Output() isCreatingChange = new EventEmitter();

  @Input() editingIndex: number;

  @Input() projects: Project[];

  @Output() updateProjects = new EventEmitter();

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
    if (this.isUpdating && this.editingIndex !== -1) {
      const curr_project = this.projects[this.editingIndex];
      const curr_date = new Date(curr_project.date);
      this.projectForm.setValue({
        name: curr_project.name,
        description: curr_project.description,
        date: curr_date.toISOString().split('T')[0],
      });
    }
  }

  onProjectSubmit() {
    const result = this.projectForm.value;
    const new_project = {
      name: result.name,
      description: result.description,
      date: result.date,
    };
    if (this.isCreating) {
      this.projectService.postProject(new_project).subscribe(() => {
        this.updateProjects.emit(null);
        this.cancel();
      });
    } else if (this.isUpdating) {
      const curr_project = this.projects[this.editingIndex];
      this.projectService
        .updateProject(curr_project.name, new_project)
        .subscribe(() => {
          this.updateProjects.emit(null);
          this.cancel();
        });
    }
  }

  cancel(): void {
    this.isUpdating = false;
    this.isUpdatingChange.emit(this.isUpdating);
    this.isCreating = false;
    this.isCreatingChange.emit(this.isCreating);
  }

  getToday(): String {
    return new Date().toISOString().split('T')[0];
  }
}
