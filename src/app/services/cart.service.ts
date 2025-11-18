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
  
  // Observable للـ Components
  public cart$: Observable<CartItem[]> = this.cartSubject.asObservable();
  public cartItems$: Observable<CartItem[]> = this.cartSubject.asObservable();

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

  // إضافة منتج للسلة
  addToCart(product: any): void {
    const currentCart = this.cartSubject.value;
    const existingProduct = currentCart.find(
      item => item.id === product.id && 
              item.color === product.color && 
              item.size === product.size
    );
    
    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
      currentCart.push({ ...product, quantity: 1 });
    }
    
    this.cartSubject.next([...currentCart]);
    this.saveCart();
  }

  // حذف منتج من السلة
  removeFromCart(itemId: number, color?: string, size?: string): void {
    const currentCart = this.cartSubject.value.filter(
      item => !(item.id === itemId && item.color === color && item.size === size)
    );
    this.cartSubject.next(currentCart);
    this.saveCart();
  }

  // زيادة الكمية
  increaseQuantity(itemId: number, color?: string, size?: string): void {
    const currentCart = this.cartSubject.value;
    const item = currentCart.find(
      i => i.id === itemId && i.color === color && i.size === size
    );
    if (item) {
      item.quantity++;
      this.cartSubject.next([...currentCart]);
      this.saveCart();
    }
  }

  // تقليل الكمية
  decreaseQuantity(itemId: number, color?: string, size?: string): void {
    const currentCart = this.cartSubject.value;
    const item = currentCart.find(
      i => i.id === itemId && i.color === color && i.size === size
    );
    if (item && item.quantity > 1) {
      item.quantity--;
      this.cartSubject.next([...currentCart]);
      this.saveCart();
    }
  }

  // جلب المنتجات
  getCartItems(): CartItem[] {
    return this.cartSubject.value;
  }

  // عدد المنتجات الكلي
  getCartCount(): number {
    return this.cartSubject.value.reduce((total, item) => total + item.quantity, 0);
  }

  // إجمالي السعر
  getCartTotal(): number {
    return this.cartSubject.value.reduce(
      (total, item) => total + (item.price * item.quantity), 
      0
    );
  }

  // مسح السلة
  clearCart(): void {
    this.cartSubject.next([]);
    this.saveCart();
  }
}