import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritesService } from '../services/favorites.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];
  isLoggedIn: boolean = false;
  isLoading: boolean = true;

  constructor(
    public favoritesService: FavoritesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // التحقق من تسجيل الدخول
    this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      
      if (loggedIn) {
        // تحميل المفضلات
        this.favoritesService.favorites$.subscribe(favs => {
          this.favorites = favs;
          this.isLoading = false;
        });
      } else {
        this.isLoading = false;
      }
    });
  }

  removeFromFavorites(product: any, event: Event) {
    event.stopPropagation();
    this.favoritesService.removeFromFavorites(product.id);
  }

  goToLogin() {
    this.router.navigate(['/login'], { 
      queryParams: { returnUrl: '/favorites' } 
    });
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }

  viewProduct(product: any) {
    this.router.navigate(['/product', product.id]);
  }
}