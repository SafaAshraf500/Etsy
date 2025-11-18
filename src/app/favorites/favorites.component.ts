import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FavoritesService, FavoriteItem } from '../services/favorites.service';
import { CartService } from '../services/cart.service';
 
@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl:'./favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent implements OnInit {
  favorites: FavoriteItem[] = [];
  favoritesCount: number = 0;

  constructor(private favoritesService: FavoritesService, private router: Router,private cartService: CartService) {}

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favoritesService.favorites$.subscribe(items => {
      this.favorites = items;
      this.favoritesCount = items.length;
    });
  }

  removeItem(productId: number) {
    if (confirm('Are you sure you want to remove this item?')) {
      this.favoritesService.removeFromFavorites(productId);
    }
  }

  clearAll() {
    if (confirm('Are you sure you want to clear all favorites?')) {
      this.favoritesService.clearFavorites();
    }
  }

addToCart(item: FavoriteItem) {
  this.cartService.addToCart(item);
  this.router.navigate(['/cart']);
}

}