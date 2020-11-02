import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'category',
    component: CategoryComponent
  },
  {
    path:'projects',
    component: ProjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
