import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoritesService, Product } from '../services/favorites.service';
import { CartService } from '../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
   standalone: true,
  imports: [FormsModule,CommonModule ],
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any = {
    name: '',
    images: [],
    rating: 0,
    reviews: 0,
    isStarSeller: false
  };
  
  selectedImage: number = 0; // Changed to number for index
  selectedColor: string = 'NAVY';
  selectedQuantity: number = 1;
  addingToCart: boolean = false;
  addedToCart: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public favoritesService: FavoritesService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProduct(+productId);
    }
  }

  loadProduct(id: number): void {
    // Mock product data
    this.product = {
      id: id,
      name: 'Embroidered Custom Apron, Customized Apron, Kitchen Apron, Personalized Chef Cooking Apron, Chefs, Bakers, Baristas, Gardener',
      images: [
        'https://images.unsplash.com/photo-1556906638-9a8b53ec4be7?w=800',
        'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=800',
        'https://images.unsplash.com/photo-1621906762058-6bfb3e5ade1e?w=800',
        'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800',
        'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800'
      ],
      price: 30.99,
      originalPrice: 51.65,
      rating: 4.9,
      reviews: 1245,
      shopName: 'JollyatStyles',
      isStarSeller: true,
      fastShipping: true
    };

    this.selectedImage = 0;
  }

  selectImage(index: number): void {
    this.selectedImage = index;
  }

  increaseQuantity(): void {
    this.selectedQuantity++;
  }

  decreaseQuantity(): void {
    if (this.selectedQuantity > 1) {
      this.selectedQuantity--;
    }
  }

  get discountPercentage(): number {
    if (this.product?.originalPrice && this.product?.price) {
      return Math.round(((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100);
    }
    return 0;
  }

  addToCart(): void {
    if (!this.product) return;

    this.addingToCart = true;
    this.addedToCart = false;

    const cartItem = {
      id: this.product.id,
      productName: this.product.name,
      shop: this.product.shopName || 'Unknown Shop',
      shopColor: '#FF6B35',
      rating: this.product.rating || 0,
      reviews: this.product.reviews || 0,
      image: this.product.images[0],
      price: this.product.price,
      originalPrice: this.product.originalPrice,
      discountPercentage: this.discountPercentage > 0 ? `${this.discountPercentage}% OFF` : undefined,
      quantity: this.selectedQuantity,
      color: this.selectedColor,
      needsPersonalization: false
    };

    // Simulate API call
    setTimeout(() => {
      this.cartService.addToCart(cartItem);
      this.addingToCart = false;
      this.addedToCart = true;

      // Hide success message after 3 seconds
      setTimeout(() => {
        this.addedToCart = false;
      }, 3000);
    }, 500);
  }

  buyNow(): void {
    if (!this.product) return;

    const cartItem = {
      id: this.product.id,
      productName: this.product.name,
      shop: this.product.shopName || 'Unknown Shop',
      shopColor: '#FF6B35',
      rating: this.product.rating || 0,
      reviews: this.product.reviews || 0,
      image: this.product.images[0],
      price: this.product.price,
      originalPrice: this.product.originalPrice,
      discountPercentage: this.discountPercentage > 0 ? `${this.discountPercentage}% OFF` : undefined,
      quantity: this.selectedQuantity,
      color: this.selectedColor,
      needsPersonalization: false
    };

    this.cartService.addToCart(cartItem);
    this.router.navigate(['/cart']);
  }

  getCartCount(): number {
    return this.cartService.getCartCount();
  }

  toggleFavorite(): void {
    if (this.product) {
      const favoriteProduct: Product = {
        id: this.product.id,
        title: this.product.name,
        image: this.product.images[0],
        price: this.product.price,
        originalPrice: this.product.originalPrice,
        rating: this.product.rating,
        reviews: this.product.reviews,
        shopName: this.product.shopName,
        fastShipping: this.product.fastShipping
      };
      this.favoritesService.toggleFavorite(favoriteProduct);
    }
  }

  isFavorite(): boolean {
    return this.product ? this.favoritesService.isFavorite(this.product.id) : false;
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}