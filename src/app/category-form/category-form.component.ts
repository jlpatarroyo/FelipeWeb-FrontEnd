import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit {
  @Input()
  currentCategory: Category;

  @Output()
  cancelSubmit = new EventEmitter<any>();

  @Output()
  createRequest = new EventEmitter<Category>();

  @Output()
  updateRequest = new EventEmitter<Category>();

  constructor() {}

  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    if(this.currentCategory){
      this.categoryForm.setValue({
        name: this.currentCategory.name,
        description: this.currentCategory.description
      });
    }
  }

  cancel(): void {
    this.cancelSubmit.emit('');
  }

  onCreateRequest(): void{
    const newCategory: Category = {
      id:"",
      name: this.categoryForm.value.name,
      description: this.categoryForm.value.description
    };
    this.createRequest.emit(newCategory);
  }

  onUpdateRequest():void{
    const categoryToUpdate: Category = {
      id:"",
      name: this.categoryForm.value.name,
      description: this.categoryForm.value.description
    };
    this.updateRequest.emit(categoryToUpdate);
  }
}
