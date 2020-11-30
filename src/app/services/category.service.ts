import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Category{
    id: String,
    name: String,
    description: String
}

@Injectable()
export class CategoryService{
    constructor(private http:HttpClient){}

    base_url = "http://localhost:8000/categories";

    getAllCategories():Observable<Category[]>{
        return this.http.get<Category[]>(this.base_url);
    }

    getCategory(name):Observable<Category>{
        return this.http.get<Category>(this.base_url + '/' + name);
    }

    addCategory(category):Observable<Category>{
        return this.http.post<Category>(this.base_url, category);
    }

    deleteCategory(name):Observable<Category>{
        return this.http.delete<Category>(this.base_url + "/" + name);
    }

    updateCategory(name, category):Observable<Category>{
        return this.http.put<Category>(this.base_url + `/${name}`, category);
    }
    
}