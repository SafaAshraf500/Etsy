import { CommonModule } from '@angular/common';
import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from "@angular/router";
import { FavoritesService } from '../services/favorites.service';

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
}

@Component({
  selector: 'app-accessories',
  standalone: true, 
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.css']
})
export class AccessoriesComponent implements OnInit {

  @ViewChild('dropdown', { static: false }) dropdownRef!: ElementRef;

  sortBy: string = 'relevancy';
  showMoreCategories: boolean = false;
  isDropdownOpen: boolean = false;

  products: Product[] = [];
  searchQuery: string = '';
  filteredProducts: Product[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 3;
  pages: number[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  sortOptions = [
    { value: 'relevancy', label: 'Relevancy' },
    { value: 'price-low', label: 'Lowest Price' },
    { value: 'price-high', label: 'Highest Price' },
    { value: 'reviews', label: 'Top Customer Reviews' },
    { value: 'newest', label: 'Most Recent' }
  ];

  categories: Category[] = [
    { id: 'scarves', name: 'Scarves & Wraps', image: 'https://i.etsystatic.com/23065476/r/il/2af31e/6820252355/il_300x300.6820252355_mtq7.jpg' },
    { id: 'hair', name: 'Hair Accessories', image: 'https://i.etsystatic.com/18750500/c/1640/1640/0/81/il/b960fb/5696846001/il_300x300.5696846001_i1pj.jpg' },
    { id: 'keychains', name: 'Keychains & Lanyards', image: 'https://i.etsystatic.com/22414130/r/il/dd3a19/4088130142/il_300x300.4088130142_hfpr.jpg' },
    { id: 'costume', name: 'Costume Accessories', image: 'https://i.etsystatic.com/13236770/r/il/248c07/6152313908/il_300x300.6152313908_st19.jpg' },
    { id: 'hats', name: 'Hats & Head Coverings', image: 'https://i.etsystatic.com/25852101/r/il/540514/3016410681/il_300x300.3016410681_4oce.jpg' },
    { id: 'belts', name: 'Belts & Suspenders', image: 'https://i.etsystatic.com/7552352/r/il/07ecee/3427247756/il_300x300.3427247756_e7k7.jpg' },
    { id: 'sunglasses', name: 'Sunglasses & Eyewear', image: 'https://i.etsystatic.com/10720842/r/il/680926/6877866510/il_300x300.6877866510_4cdc.jpg' },
    { id: 'gloves', name: 'Gloves & Mittens', image: 'https://i.etsystatic.com/5316916/r/il/0cc5f2/5394610708/il_300x300.5394610708_q84m.jpg' },
    { id: 'umbrellas', name: 'Umbrellas & Rain Accessories', image: 'https://i.etsystatic.com/13525872/c/2121/2121/0/90/il/dfff9d/2745411890/il_300x300.2745411890_hink.jpg' },
    { id: 'patches', name: 'Patches & Appliques', image: 'https://i.etsystatic.com/11499597/c/1828/1828/217/220/il/ce75ba/6039727253/il_300x300.6039727253_clnk.jpg' },
    { id: 'aprons', name: 'Aprons', image: 'https://i.etsystatic.com/7884596/r/il/225bb8/5978256852/il_300x300.5978256852_qmoj.jpg' },
    { id: 'suit', name: 'Suit & Tie Accessories', image: 'https://i.etsystatic.com/23939453/c/2000/2000/0/795/il/869b8b/6563167739/il_300x300.6563167739_bquv.jpg' },
    { id: 'pins', name: 'Pins & Clips', image: 'https://i.etsystatic.com/11499597/r/il/cddc19/6320914845/il_300x300.6320914845_gs4s.jpg' },
    { id: 'fans', name: 'Hand Fans', image: 'https://i.etsystatic.com/28947665/c/1995/1995/0/344/il/7872cd/5825807177/il_300x300.5825807177_7zya.jpg' },
    { id: 'bouquets', name: 'Bouquets & Corsages', image: 'https://i.etsystatic.com/15017846/r/il/30f48a/4896061697/il_300x300.4896061697_kg2m.jpg' },
    { id: 'masks', name: 'Face Masks & Accessories', image: 'https://i.etsystatic.com/22657642/r/il/4a4802/2548834143/il_300x300.2548834143_mcld.jpg' },
    { id: 'collars', name: 'Collars', image: 'https://i.etsystatic.com/21668141/r/il/829185/2941538909/il_300x300.2941538909_ftuj.jpg' }
  ];

  allProducts: Product[] = [
    { id: 1, title: 'Personalized Kids Apron with Pockets, Custom Name Apron', price: 11.48, originalPrice: 22.97, discount: 50, rating: 5, reviews: 12543, image: 'assets/images/product1.jpg', seller: 'LittleAiLand', isStarSeller: true, freeShipping: false, adBySeller: false },
    { id: 2, title: 'Custom Embroidered Apron with Your Text - Personalized Gift', price: 9.90, originalPrice: 14.14, discount: 30, rating: 5, reviews: 62173, image: 'assets/images/product2.jpg', seller: 'AuraJewelsArt', isStarSeller: true, freeShipping: true, adBySeller: false },
    { id: 3, title: 'Custom Groomsmen Gifts, Groomsmen Proposal Gift', price: 9.71, originalPrice: 19.43, discount: 50, rating: 5, reviews: 2674, image: 'assets/images/product3.jpg', seller: 'CraftyCufflinkCorner', isStarSeller: true, freeShipping: true, adBySeller: false },
    { id: 4, title: 'Personalized Hair Claw Clip, Engraved Custom Name', price: 7.99, originalPrice: 9.99, discount: 20, rating: 5, reviews: 6212, image: 'assets/images/product4.jpg', seller: 'Shesli', isStarSeller: true, freeShipping: false, adBySeller: false },
    { id: 5, title: 'Vintage Keychain Set with Custom Engraving', price: 24.79, originalPrice: 49.57, discount: 50, rating: 4.8, reviews: 834, image: 'assets/images/product5.jpg', seller: 'VintageVault', isStarSeller: false, freeShipping: false, adBySeller: true },
    { id: 6, title: 'Handmade Velvet Hair Bow - Red & Green', price: 18.75, originalPrice: 25.00, discount: 25, rating: 4.9, reviews: 1523, image: 'assets/images/product6.jpg', seller: 'BowsByDesign', isStarSeller: true, freeShipping: false, adBySeller: true },
    { id: 7, title: 'Sterling Silver Ring Set - Minimalist Design', price: 19.50, originalPrice: 27.86, discount: 30, rating: 5, reviews: 945, image: 'assets/images/product7.jpg', seller: 'ModernMetals', isStarSeller: false, freeShipping: false, adBySeller: true },
    { id: 8, title: 'Custom Name Necklace - Personalized Jewelry', price: 6.00, originalPrice: 14.99, discount: 60, rating: 4.7, reviews: 2341, image: 'assets/images/product8.jpg', seller: 'JewelryMakers', isStarSeller: false, freeShipping: false, adBySeller: true },
    { id: 9, title: 'Leather Wallet with RFID Protection', price: 19.50, originalPrice: 27.86, discount: 30, rating: 5, reviews: 945, image: 'assets/images/product7.jpg', seller: 'ModernMetals', isStarSeller: false, freeShipping: false, adBySeller: true },
    { id: 10, title: 'Handcrafted Silk Scarf', price: 32.00, originalPrice: 45.00, discount: 29, rating: 4.9, reviews: 567, image: 'assets/images/product7.jpg', seller: 'SilkCreations', isStarSeller: true, freeShipping: true, adBySeller: false },
    { id: 11, title: 'Vintage Sunglasses Collection', price: 45.00, originalPrice: 60.00, discount: 25, rating: 4.8, reviews: 1234, image: 'assets/images/product7.jpg', seller: 'RetroShades', isStarSeller: false, freeShipping: false, adBySeller: true },
    { id: 12, title: 'Premium Leather Belt', price: 28.99, originalPrice: 39.99, discount: 27, rating: 5, reviews: 892, image: 'assets/images/product7.jpg', seller: 'LeatherCraft', isStarSeller: true, freeShipping: false, adBySeller: false },
    { id: 13, title: 'Wool Winter Hat', price: 22.50, originalPrice: 30.00, discount: 25, rating: 4.7, reviews: 456, image: 'assets/images/product7.jpg', seller: 'WinterWarmth', isStarSeller: false, freeShipping: true, adBySeller: false },
    { id: 14, title: 'Designer Watch Collection', price: 89.99, originalPrice: 120.00, discount: 25, rating: 4.9, reviews: 2341, image: 'assets/images/product7.jpg', seller: 'TimeKeepers', isStarSeller: true, freeShipping: true, adBySeller: false },
    { id: 15, title: 'Cashmere Gloves', price: 35.00, originalPrice: 50.00, discount: 30, rating: 5, reviews: 678, image: 'assets/images/product7.jpg', seller: 'LuxuryWear', isStarSeller: true, freeShipping: false, adBySeller: true },
    { id: 16, title: 'Umbrella Set - Rain Collection', price: 42.00, originalPrice: 60.00, discount: 30, rating: 4.6, reviews: 234, image: 'assets/images/product7.jpg', seller: 'RainyDays', isStarSeller: false, freeShipping: false, adBySeller: false },
    { id: 17, title: 'Pearl Necklace Set', price: 55.00, originalPrice: 75.00, discount: 27, rating: 5, reviews: 1567, image: 'assets/images/product7.jpg', seller: 'PearlBeauty', isStarSeller: true, freeShipping: true, adBySeller: false },
    { id: 18, title: 'Gold Chain Bracelet', price: 38.50, originalPrice: 55.00, discount: 30, rating: 4.8, reviews: 890, image: 'assets/images/product7.jpg', seller: 'GoldSmith', isStarSeller: false, freeShipping: false, adBySeller: true },
    { id: 19, title: 'Diamond Stud Earrings', price: 125.00, originalPrice: 175.00, discount: 29, rating: 5, reviews: 3456, image: 'assets/images/product7.jpg', seller: 'DiamondDeluxe', isStarSeller: true, freeShipping: true, adBySeller: false },
    { id: 20, title: 'Silk Tie Collection', price: 29.99, originalPrice: 45.00, discount: 33, rating: 4.7, reviews: 567, image: 'assets/images/product7.jpg', seller: 'TieEmporium', isStarSeller: false, freeShipping: false, adBySeller: false },
    { id: 21, title: 'Leather Briefcase', price: 95.00, originalPrice: 130.00, discount: 27, rating: 5, reviews: 789, image: 'assets/images/product7.jpg', seller: 'ProfessionalGear', isStarSeller: true, freeShipping: true, adBySeller: false },
    { id: 22, title: 'Cosmetic Bag Set', price: 18.50, originalPrice: 25.00, discount: 26, rating: 4.8, reviews: 1234, image: 'assets/images/product7.jpg', seller: 'BeautyEssentials', isStarSeller: false, freeShipping: false, adBySeller: true },
    { id: 23, title: 'Travel Backpack', price: 65.00, originalPrice: 90.00, discount: 28, rating: 4.9, reviews: 2345, image: 'assets/images/product7.jpg', seller: 'TravelGear', isStarSeller: true, freeShipping: true, adBySeller: false },
    { id: 24, title: 'Phone Case Collection', price: 15.99, originalPrice: 24.99, discount: 36, rating: 4.6, reviews: 5678, image: 'assets/images/product7.jpg', seller: 'TechStyle', isStarSeller: false, freeShipping: false, adBySeller: false }
  ];

  ngOnInit(): void {
    this.filteredProducts = [...this.allProducts];
    this.calculateTotalPages();
    this.loadProducts();
  }

  // ✅ الطريقة الصحيحة للتحقق من النقر خارج العنصر
  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent): void {
    // تحقق من أن dropdownRef موجود وأن النقرة خارج العنصر
    if (this.dropdownRef && 
        this.dropdownRef.nativeElement && 
        !this.dropdownRef.nativeElement.contains(event.target as Node)) {
      this.isDropdownOpen = false;
    }
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation(); // منع انتشار الحدث
    this.isDropdownOpen = !this.isDropdownOpen;
    console.log('Dropdown state:', this.isDropdownOpen); // للتأكد من التغيير
  }

  selectSort(value: string, event: Event): void {
    event.stopPropagation();
    this.sortBy = value;
    this.isDropdownOpen = false;
    this.sortProducts(value);
  }

  getSortLabel(): string {
    const opt = this.sortOptions.find(o => o.value === this.sortBy);
    return opt ? opt.label : 'Relevancy';
  }

  sortProducts(sortBy: string): void {
    switch(sortBy) {
      case 'price-low':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'reviews':
        this.filteredProducts.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'newest':
        this.filteredProducts.sort((a, b) => b.id - a.id);
        break;
    }
    this.loadProducts();
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
  }

  loadProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.products = this.filteredProducts.slice(startIndex, endIndex);
  }

  onSearchChange(): void {
    const query = this.searchQuery.toLowerCase().trim();
    if (query) {
      this.filteredProducts = this.allProducts.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.seller.toLowerCase().includes(query)
      );
    } else {
      this.filteredProducts = [...this.allProducts];
    }
    this.currentPage = 1;
    this.calculateTotalPages();
    this.loadProducts();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.onSearchChange();
  }

  toggleCategories(): void {
    this.showMoreCategories = !this.showMoreCategories;
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

  addToFavorites(product: Product, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    const isFav = this.favoritesService.isFavorite(product.id);
    if (isFav) {
      this.favoritesService.removeFromFavorites(product.id);
    } else {
      this.favoritesService.addToFavorites(product);
    }
  }

  isFavorite(productId: number): boolean {
    return this.favoritesService.isFavorite(productId);
  }

  goToFavorites(): void {
    this.router.navigate(['/favorites']);
  }

}