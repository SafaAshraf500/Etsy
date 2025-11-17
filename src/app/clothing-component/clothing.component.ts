import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FavoritesService } from '../services/favorites.service';
import { Router, RouterModule } from '@angular/router';

interface Category {
  id: string;
  name: string;
  image: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  image: string;
  seller: string;
  isStarSeller: boolean;
  freeShipping: boolean;
  adBySeller?: boolean;
  fastShipping?: boolean;
}

@Component({
  selector: 'app-clothing',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterModule ],
  templateUrl: './clothing.component.html',
  styleUrls: ['./clothing.component.css']
})
export class ClothingComponent implements OnInit {
  sortBy: string = 'relevancy';
  showMoreCategories: boolean = false;
  totalItems: number = 1000;
  isDropdownOpen: boolean = false;
  showSortDropdown: boolean = false;
  Math = Math;
  favorites: any[] = [];
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 3;
  pages: number[] = [];

  categories: Category[] = [
    {
      id: 'women',
      name: "Women's Clothing",
      image: 'https://i.etsystatic.com/17774346/r/il/161ad5/2663702011/il_300x300.2663702011_otj1.jpg'
    },
    {
      id: 'men',
      name: "Men's Clothing",
      image: 'https://i.etsystatic.com/8920958/c/1369/1369/251/322/il/1fced6/4356189253/il_300x300.4356189253_5nk4.jpg'
    },
    {
      id: 'gender-neutral',
      name: 'Gender-Neutral Adult Clothing',
      image: 'https://i.etsystatic.com/23801029/r/il/e54f59/6551509102/il_300x300.6551509102_olwa.jpg'
    },
    {
      id: 'girls',
      name: "Girls' Clothing",
      image: 'https://i.etsystatic.com/16991807/r/il/d8ffd4/5043247397/il_300x300.5043247397_d4m5.jpg'
    },
    {
      id: 'indian',
      name: 'Indian Ethnic Clothing',
      image: 'https://i.etsystatic.com/40063960/c/1066/1066/0/0/il/e3323b/5652676567/il_300x300.5652676567_3df6.jpg'
    },
    {
      id: 'boys',
      name: "Boys' Clothing",
      image: 'https://i.etsystatic.com/22287963/r/il/c2fe7b/5742374059/il_300x300.5742374059_e7wa.jpg'
    },
    {
      id: 'baby',
      name: "Baby Clothing",
      image: 'https://i.etsystatic.com/31350947/c/1334/1334/0/222/il/d26d30/4322348477/il_300x300.4322348477_f8se.jpg'
    }
  ];

  // كل المنتجات
  allProducts: Product[] = [
    {
      id: 1,
      title: 'Winter Wonderland, Winter Sweatshirt, Christmas Sweatshirt',
      price: 14.29,
      originalPrice: 21.99,
      discount: 35,
      rating: 5,
      reviews: 16317,
      image: 'https://i.etsystatic.com/28901234/r/il/0fd384/2567890123/il_794xN.2567890123_vwx8.jpg',
      seller: 'Star Seller',
      isStarSeller: true,
      freeShipping: false,
      adBySeller: true
    },
    {
      id: 2,
      title: 'Custom Comfort Colors Vintage Bootleg Pet Sweatshirt',
      price: 8.00,
      originalPrice: 19.99,
      discount: 60,
      rating: 4.5,
      reviews: 62508,
      image: 'https://i.etsystatic.com/39012345/r/il/1ae495/3012345678/il_794xN.3012345678_yza9.jpg',
      seller: 'Star Seller',
      isStarSeller: true,
      freeShipping: false,
      adBySeller: true,
      fastShipping: true
    },
    {
      id: 3,
      title: 'Women in science - scientist t shirt',
      price: 8.09,
      originalPrice: 17.98,
      discount: 55,
      rating: 5,
      reviews: 17321,
      image: 'https://i.etsystatic.com/40123456/r/il/2bf506/3456789012/il_794xN.3456789012_bcd1.jpg',
      seller: 'Etsy seller',
      isStarSeller: false,
      freeShipping: false,
      adBySeller: true
    },
    {
      id: 4,
      title: 'Sea Animals Hoodie, Ocean Life Sweatshirt, Beach Lover Gift',
      price: 15.50,
      originalPrice: 31.00,
      discount: 50,
      rating: 5,
      reviews: 1906,
      image: 'https://i.etsystatic.com/51234567/r/il/3cg617/3890123456/il_794xN.3890123456_efg2.jpg',
      seller: 'Etsy seller',
      isStarSeller: false,
      freeShipping: false,
      adBySeller: true
    },
    {
      id: 5,
      title: 'Personalized Outline Portrait Hoodie, Family Sweatshirt',
      price: 25.20,
      originalPrice: 36.00,
      discount: 30,
      rating: 4,
      reviews: 720,
      image: 'https://i.etsystatic.com/62345678/r/il/4dh728/4234567890/il_794xN.4234567890_hij3.jpg',
      seller: 'AbbyParty',
      isStarSeller: false,
      freeShipping: false,
      adBySeller: false
    },
    {
      id: 6,
      title: 'Custom Dog Face Embroidered Sweatshirt, Cat Portrait Hoodie',
      price: 9.96,
      originalPrice: 24.90,
      discount: 60,
      rating: 4,
      reviews: 2001,
      image: 'https://i.etsystatic.com/73456789/r/il/5ei839/4678901234/il_794xN.4678901234_klm4.jpg',
      seller: 'Star Seller',
      isStarSeller: true,
      freeShipping: false,
      adBySeller: false
    },
    {
      id: 7,
      title: 'Cozy Reindeer Cardigan Sweater Womens Christmas Sweater',
      price: 63.10,
      originalPrice: 84.14,
      discount: 25,
      rating: 5,
      reviews: 2456,
      image: 'https://i.etsystatic.com/84567890/r/il/6fj940/5123456789/il_794xN.5123456789_nop5.jpg',
      seller: 'Eversigns',
      isStarSeller: false,
      freeShipping: true,
      adBySeller: false
    },
    {
      id: 8,
      title: 'Personalized Reading Socks • "Shhh I\'m Reading" Book Lover Gift',
      price: 11.37,
      originalPrice: 15.16,
      discount: 25,
      rating: 5,
      reviews: 809,
      image: 'https://i.etsystatic.com/95678901/r/il/7gk051/5567890123/il_794xN.5567890123_qrs6.jpg',
      seller: 'Star Seller',
      isStarSeller: true,
      freeShipping: false,
      adBySeller: false
    },
        {
      id: 9,
      title: 'Personalized Reading Socks • "Shhh I\'m Reading" Book Lover Gift',
      price: 11.37,
      originalPrice: 15.16,
      discount: 25,
      rating: 5,
      reviews: 809,
      image: 'https://i.etsystatic.com/95678901/r/il/7gk051/5567890123/il_794xN.5567890123_qrs6.jpg',
      seller: 'Star Seller',
      isStarSeller: true,
      freeShipping: false,
      adBySeller: false
    },
        {
      id: 10,
      title: 'Personalized Reading Socks • "Shhh I\'m Reading" Book Lover Gift',
      price: 11.37,
      originalPrice: 15.16,
      discount: 25,
      rating: 5,
      reviews: 809,
      image: 'https://i.etsystatic.com/95678901/r/il/7gk051/5567890123/il_794xN.5567890123_qrs6.jpg',
      seller: 'Star Seller',
      isStarSeller: true,
      freeShipping: false,
      adBySeller: false
    },
        {
      id: 11,
      title: 'Personalized Reading Socks • "Shhh I\'m Reading" Book Lover Gift',
      price: 11.37,
      originalPrice: 15.16,
      discount: 25,
      rating: 5,
      reviews: 809,
      image: 'https://i.etsystatic.com/95678901/r/il/7gk051/5567890123/il_794xN.5567890123_qrs6.jpg',
      seller: 'Star Seller',
      isStarSeller: true,
      freeShipping: false,
      adBySeller: false
    },
        {
      id: 12,
      title: 'Personalized Reading Socks • "Shhh I\'m Reading" Book Lover Gift',
      price: 11.37,
      originalPrice: 15.16,
      discount: 25,
      rating: 5,
      reviews: 809,
      image: 'https://i.etsystatic.com/95678901/r/il/7gk051/5567890123/il_794xN.5567890123_qrs6.jpg',
      seller: 'Star Seller',
      isStarSeller: true,
      freeShipping: false,
      adBySeller: false
    },
        {
      id: 13,
      title: 'Personalized Reading Socks • "Shhh I\'m Reading" Book Lover Gift',
      price: 11.37,
      originalPrice: 15.16,
      discount: 25,
      rating: 5,
      reviews: 809,
      image: 'https://i.etsystatic.com/95678901/r/il/7gk051/5567890123/il_794xN.5567890123_qrs6.jpg',
      seller: 'Star Seller',
      isStarSeller: true,
      freeShipping: false,
      adBySeller: false
    }
    ,    {
      id: 14,
      title: 'Personalized Reading Socks • "Shhh I\'m Reading" Book Lover Gift',
      price: 11.37,
      originalPrice: 15.16,
      discount: 25,
      rating: 5,
      reviews: 809,
      image: 'https://i.etsystatic.com/95678901/r/il/7gk051/5567890123/il_794xN.5567890123_qrs6.jpg',
      seller: 'Star Seller',
      isStarSeller: true,
      freeShipping: false,
      adBySeller: false
    },
        {
      id: 15,
      title: 'Personalized Reading Socks • "Shhh I\'m Reading" Book Lover Gift',
      price: 11.37,
      originalPrice: 15.16,
      discount: 25,
      rating: 5,
      reviews: 809,
      image: 'https://i.etsystatic.com/95678901/r/il/7gk051/5567890123/il_794xN.5567890123_qrs6.jpg',
      seller: 'Star Seller',
      isStarSeller: true,
      freeShipping: false,
      adBySeller: false
    },
        {
      id: 16,
      title: 'Personalized Reading Socks • "Shhh I\'m Reading" Book Lover Gift',
      price: 11.37,
      originalPrice: 15.16,
      discount: 25,
      rating: 5,
      reviews: 809,
      image: 'https://i.etsystatic.com/95678901/r/il/7gk051/5567890123/il_794xN.5567890123_qrs6.jpg',
      seller: 'Star Seller',
      isStarSeller: true,
      freeShipping: false,
      adBySeller: false
    },    {
      id: 17,
      title: 'Personalized Reading Socks • "Shhh I\'m Reading" Book Lover Gift',
      price: 11.37,
      originalPrice: 15.16,
      discount: 25,
      rating: 5,
      reviews: 809,
      image: 'https://i.etsystatic.com/95678901/r/il/7gk051/5567890123/il_794xN.5567890123_qrs6.jpg',
      seller: 'Star Seller',
      isStarSeller: true,
      freeShipping: false,
      adBySeller: false
    },
        {
      id: 18,
      title: 'Personalized Reading Socks • "Shhh I\'m Reading" Book Lover Gift',
      price: 11.37,
      originalPrice: 15.16,
      discount: 25,
      rating: 5,
      reviews: 809,
      image: 'https://i.etsystatic.com/95678901/r/il/7gk051/5567890123/il_794xN.5567890123_qrs6.jpg',
      seller: 'Star Seller',
      isStarSeller: true,
      freeShipping: false,
      adBySeller: false
    },
        {
      id: 19,
      title: 'Personalized Reading Socks • "Shhh I\'m Reading" Book Lover Gift',
      price: 11.37,
      originalPrice: 15.16,
      discount: 25,
      rating: 5,
      reviews: 809,
      image: 'https://i.etsystatic.com/95678901/r/il/7gk051/5567890123/il_794xN.5567890123_qrs6.jpg',
      seller: 'Star Seller',
      isStarSeller: true,
      freeShipping: false,
      adBySeller: false
    },
        {
      id: 20,
      title: 'Personalized Reading Socks • "Shhh I\'m Reading" Book Lover Gift',
      price: 11.37,
      originalPrice: 15.16,
      discount: 25,
      rating: 5,
      reviews: 809,
      image: 'https://i.etsystatic.com/95678901/r/il/7gk051/5567890123/il_794xN.5567890123_qrs6.jpg',
      seller: 'Star Seller',
      isStarSeller: true,
      freeShipping: false,
      adBySeller: false
    },
        {
      id: 21,
      title: 'Personalized Reading Socks • "Shhh I\'m Reading" Book Lover Gift',
      price: 11.37,
      originalPrice: 15.16,
      discount: 25,
      rating: 5,
      reviews: 809,
      image: 'https://i.etsystatic.com/95678901/r/il/7gk051/5567890123/il_794xN.5567890123_qrs6.jpg',
      seller: 'Star Seller',
      isStarSeller: true,
      freeShipping: false,
      adBySeller: false
    }
  ];
   constructor(public favoritesService: FavoritesService) {}

  onHeartClick(product: any, event: Event) {
    event.stopPropagation();
    this.favoritesService.toggleFavorite(product);
  }

  // المنتجات اللي هتظهر في الصفحة الحالية
  products: Product[] = [];

  sortOptions = [
    { value: 'relevancy', label: 'Relevancy' },
    { value: 'price-low', label: 'Lowest Price' },
    { value: 'price-high', label: 'Highest Price' },
    { value: 'reviews', label: 'Top Customer Reviews' },
    { value: 'newest', label: 'Most Recent' }
  ];

  ngOnInit(): void {
    this.calculateTotalPages();
    this.loadProducts();
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.allProducts.length / this.itemsPerPage);
    this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
  }

  loadProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.products = this.allProducts.slice(startIndex, endIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadProducts();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProducts();
    }
  }

  toggleSortDropdown(): void {
    this.showSortDropdown = !this.showSortDropdown;
  }

  selectSort(value: string): void {
    this.sortBy = value;
    this.showSortDropdown = false;
    this.sortProducts(value);
  }

  getSortLabel(value: string): string {
    const option = this.sortOptions.find(opt => opt.value === value);
    return option ? option.label : 'Relevancy';
  }

  toggleCategories(): void {
    this.showMoreCategories = !this.showMoreCategories;
  }

  getDisplayedCategories(): Category[] {
    return this.showMoreCategories ? this.categories : this.categories.slice(0, 6);
  }

  sortProducts(sortBy: string): void {
    switch(sortBy) {
      case 'price-low':
        this.allProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        this.allProducts.sort((a, b) => b.price - a.price);
        break;
      case 'reviews':
        this.allProducts.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }
    this.loadProducts();
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: any): void {
    const target = event.target;
    const clickedInside = target.closest('.custom-select');
    if (!clickedInside) {
      this.showSortDropdown = false;
    }
  }
}