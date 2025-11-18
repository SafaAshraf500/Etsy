import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../../services/cart.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  cartCount: number = 0;
  isScrolled = false;
  isDropdownOpen = false;

  constructor(
    private router: Router, 
    private cartService: CartService
  ) {
    // تحديث العداد عند التنقل بين الصفحات
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateCartCount();
    });
  }

ngOnInit() {
  this.cartService.cartItems$.subscribe(items => {
    this.cartCount = items.length; // 👈 هيتحدث فوراً!
  });
}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  // تحديث عدد المنتجات في السلة
  updateCartCount() {
    const items = this.cartService.getCartItems();
    this.cartCount = items.length;
  }

addToCart(product: any) {
  this.cartService.addToCart(product);
  // العداد هيتحدث أوتوماتيك! ✨
}
}