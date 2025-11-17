import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {

private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}


  getAllCategories(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/cate-types`);
  }

  
  getCategoryItems(): Observable<any> {
    return this.http.get(`${this.baseUrl}/cateItems`);
  }

  getItemById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/cateItems/${id}`);
  }
}
