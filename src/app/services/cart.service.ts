import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: number;
  productName: string;
  shop: string;
  shopColor: string;
  rating: number;
  reviews: number;
  image: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: string;
  discount?: string;
  quantity: number;
  color?: string;
  size?: string;
  isDigital?: boolean;
  instantDownload?: boolean;
  filesIncluded?: string;
  saleEndsSoon?: boolean;
  needsPersonalization?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  public cart$: Observable<CartItem[]> = this.cartSubject.asObservable();

  constructor() {
    this.loadCart();
  }

  private loadCart(): void {
    const saved = localStorage.getItem('cart');
    if (saved) {
      this.cartSubject.next(JSON.parse(saved));
    }
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartSubject.value));
  }

  addToCart(item: CartItem): void {
    const currentCart = this.cartSubject.value;
    const existingItem = currentCart.find(
      i => i.id === item.id && i.color === item.color && i.size === item.size
    );

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      currentCart.push(item);
    }

    this.cartSubject.next(currentCart);
    this.saveCart();
  }

  removeFromCart(itemId: number, color?: string, size?: string): void {
    const currentCart = this.cartSubject.value.filter(
      item => !(item.id === itemId && item.color === color && item.size === size)
    );
    this.cartSubject.next(currentCart);
    this.saveCart();
  }

  increaseQuantity(itemId: number, color?: string, size?: string): void {
    const currentCart = this.cartSubject.value;
    const item = currentCart.find(
      i => i.id === itemId && i.color === color && i.size === size
    );
    if (item) {
      item.quantity++;
      this.cartSubject.next(currentCart);
      this.saveCart();
    }
  }

  decreaseQuantity(itemId: number, color?: string, size?: string): void {
    const currentCart = this.cartSubject.value;
    const item = currentCart.find(
      i => i.id === itemId && i.color === color && i.size === size
    );
    if (item && item.quantity > 1) {
      item.quantity--;
      this.cartSubject.next(currentCart);
      this.saveCart();
    }
  }

  getCartItems(): CartItem[] {
    return this.cartSubject.value;
  }

  getCartCount(): number {
    return this.cartSubject.value.reduce((total, item) => total + item.quantity, 0);
  }

  getCartTotal(): number {
    return this.cartSubject.value.reduce(
      (total, item) => total + (item.price * item.quantity), 
      0
    );
  }

  clearCart(): void {
    this.cartSubject.next([]);
    localStorage.removeItem('cart');
  }
}