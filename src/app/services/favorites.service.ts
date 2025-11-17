import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  shopName?: string;
  fastShipping?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  favorites: Product[] = [];
  private favoritesSubject = new BehaviorSubject<any[]>([]);
favorites$ = this.favoritesSubject.asObservable();
  constructor() {
    this.loadFavorites();
  }

  private loadFavorites(): void {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      this.favorites = JSON.parse(saved);
    }
  }

  private saveFavorites(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  addToFavorites(product: Product): void {
    if (!this.favorites.find(p => p.id === product.id)) {
      this.favorites.push(product);
      this.saveFavorites();
    }
  }

  removeFromFavorites(productId: number): void {
    this.favorites = this.favorites.filter(p => p.id !== productId);
    this.saveFavorites();
  }

  toggleFavorite(product: Product): void {
    if (this.isFavorite(product.id)) {
      this.removeFromFavorites(product.id);
    } else {
      this.addToFavorites(product);
    }
  }

  isFavorite(productId: number): boolean {
    return this.favorites.some(p => p.id === productId);
  }

  getFavorites(): Product[] {
    return this.favorites;
  }

  clearFavorites(): void {
    this.favorites = [];
    localStorage.removeItem('favorites');
  }
}