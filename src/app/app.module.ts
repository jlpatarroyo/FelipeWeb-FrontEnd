import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectService } from './services/project.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { CategoryService } from './services/category.service';
import { CategoryFormComponent } from './category-form/category-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    HomeComponent,
    CategoryComponent,
    ProjectListComponent,
    ProjectFormComponent,
    ProjectDetailComponent,
    CategoryFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [ProjectService, CategoryService],
  bootstrap: [AppComponent],
})
export class AppModule {}
