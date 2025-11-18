import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface FavoriteItem {
  id: number;
  title: string;
  price: number;
  image: string;
  seller?: string;
  rating?: number;
  reviews?: number;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesSubject = new BehaviorSubject<FavoriteItem[]>([]);
  public favorites$: Observable<FavoriteItem[]> = this.favoritesSubject.asObservable();

  constructor() {
    this.loadFavorites();
  }

  // تحميل المفضلة من localStorage
  private loadFavorites(): void {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      this.favoritesSubject.next(JSON.parse(saved));
    }
  }

  // حفظ المفضلة في localStorage
  private saveFavorites(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favoritesSubject.value));
  }

  // إضافة للمفضلة
  addToFavorites(product: any): boolean {
    const currentFavorites = this.favoritesSubject.value;
    const exists = currentFavorites.find(item => item.id === product.id);

    if (!exists) {
      const favoriteItem: FavoriteItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        seller: product.seller,
        rating: product.rating,
        reviews: product.reviews
      };

      currentFavorites.push(favoriteItem);
      this.favoritesSubject.next([...currentFavorites]);
      this.saveFavorites();
      return true; // تمت الإضافة
    }

    return false; // موجود بالفعل
  }

  // حذف من المفضلة
  removeFromFavorites(productId: number): void {
    const currentFavorites = this.favoritesSubject.value.filter(
      item => item.id !== productId
    );
    this.favoritesSubject.next(currentFavorites);
    this.saveFavorites();
  }

  // التحقق من وجود منتج في المفضلة
  isFavorite(productId: number): boolean {
    return this.favoritesSubject.value.some(item => item.id === productId);
  }

  // جلب جميع المفضلة
  getFavorites(): FavoriteItem[] {
    return this.favoritesSubject.value;
  }

  // عدد المنتجات في المفضلة
  getFavoritesCount(): number {
    return this.favoritesSubject.value.length;
  }

  // مسح كل المفضلة
  clearFavorites(): void {
    this.favoritesSubject.next([]);
    localStorage.removeItem('favorites');
  }

  // Toggle - إضافة أو حذف
  toggleFavorite(product: any): boolean {
    if (this.isFavorite(product.id)) {
      this.removeFromFavorites(product.id);
      return false; // تم الحذف
    } else {
      return this.addToFavorites(product); // تمت الإضافة
    }
  }
}