import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Project {
  id: String;
  name: String;
  description: String;
  date: Date;
}

@Injectable()
export class ProjectService {
  constructor(private http: HttpClient) {}

  base_url = 'http://localhost:8000/projects';

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.base_url);
  }

  getProject(name: String): Observable<Project> {
    return this.http.get<Project>(this.base_url + '/' + name);
  }

  postProject(project: {}): Observable<Project> {
    return this.http.post<Project>(this.base_url, project);
  }

  deleteProject(name: String): Observable<Project> {
    return this.http.delete<Project>(this.base_url + '/' + name);
  }

  updateProject(curr_name: String, new_project: {}) {
    return this.http.put<Project>(this.base_url + '/' + curr_name, new_project);
  }
}
