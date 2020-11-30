import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
import { Observable } from 'rxjs';
import { Category, CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  constructor(private categoriesService: CategoryService) {}

  categories: Category[];
  currentCategory: Category;
  currentIndex: number;
  isEditing: Boolean;

  ngOnInit(): void {
    this.getCategories();
    this.isEditing = false;
  }

  setDefaultCategory(): void {
    if (this.categories.length > 0) {
      this.currentCategory = this.categories[0];
      this.currentIndex = 0;
    } else {
      this.currentCategory = null;
      this.currentIndex = -1;
    }
  }

  getCategories(): void {
    this.categoriesService.getAllCategories().subscribe((res) => {
      this.categories = res;
      this.setDefaultCategory();
    });
  }

  pickCategory(index: number): void {
    this.currentCategory = this.categories[index];
    this.currentIndex = index;
    this.isEditing = false;
  }

  clickCreate(): void {
    this.currentCategory = null;
    this.isEditing = true;
  }

  createCategory(category): void {
    this.categoriesService.addCategory(category).subscribe(() => {
      this.getCategories();
      this.isEditing = false;
    });
  }

  deleteCategory(): void {
    const name = this.categories[this.currentIndex].name;
    if (name) {
      this.categoriesService.deleteCategory(name).subscribe(() => {
        this.getCategories();
      });
    }
  }

  updateCategory(category): void{
    if(this.currentCategory){
      const currentName = this.currentCategory.name;
      this.categoriesService.updateCategory(currentName, category).subscribe((res) =>{
        this.getCategories();
        this.isEditing = false;
      })
    }
  }
}
