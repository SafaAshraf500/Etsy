import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CartComponent } from '../../../cart/cart.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
  FormsModule,RouterModule,MatIconModule, MatMenuModule,
  MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    cartCount: number = 0;
   isScrolled = false;
  isDropdownOpen = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }
constructor(private router: Router) {}
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  
  goToCart() {
    this.router.navigate(['/cart']);
  }

  // مثال لإضافة منتج للكارت
  addToCart() {
    this.cartCount++;
  }
}
