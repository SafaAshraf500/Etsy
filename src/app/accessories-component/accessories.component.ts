
import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";

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
  // ============ Properties ============
  sortBy: string = 'relevancy';
  showMoreCategories: boolean = false;
  totalItems: number = 1000;
  isDropdownOpen: boolean = false;
    // المنتجات اللي هتظهر في الصفحة الحالية
  products: Product[] = [];
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 3;
  pages: number[] = [];

  // ============ Pagination Properties ============

  sortOptions = [
    { value: 'relevancy', label: 'Relevancy' },
    { value: 'price-low', label: 'Lowest Price' },
    { value: 'price-high', label: 'Highest Price' },
    { value: 'reviews', label: 'Top Customer Reviews' },
    { value: 'newest', label: 'Most Recent' }
  ];

  categories: Category[] = [
    {
      id: 'scarves',
      name: 'Scarves & Wraps',
      image: 'https://i.etsystatic.com/13140165/r/il/cc05a2/7059150953/il_300x300.7059150953_a4xy.jpg'
    },
    {
      id: 'hair',
      name: 'Hair Accessories',
      image: 'https://i.etsystatic.com/18750500/c/1640/1640/0/81/il/b960fb/5696846001/il_300x300.5696846001_i1pj.jpg'
    },
    {
      id: 'keychains',
      name: 'Keychains & Lanyards',
      image: 'https://i.etsystatic.com/22414130/r/il/dd3a19/4088130142/il_300x300.4088130142_hfpr.jpg'
    },
    {
      id: 'costume',
      name: 'Costume Accessories',
      image: 'https://i.etsystatic.com/13236770/r/il/248c07/6152313908/il_300x300.6152313908_st19.jpg'
    },
    {
      id: 'hats',
      name: 'Hats & Head Coverings',
      image: 'https://i.etsystatic.com/25852101/r/il/540514/3016410681/il_300x300.3016410681_4oce.jpg'
    },
    {
      id: 'belts',
      name: 'Belts & Suspenders',
      image: 'https://i.etsystatic.com/7552352/r/il/07ecee/3427247756/il_300x300.3427247756_e7k7.jpg'
    },
    {
      id: 'sunglasses',
      name: 'Sunglasses & Eyewear',
      image: 'https://i.etsystatic.com/15662464/r/il/1a0a7e/3829401234/il_300x300.3829401234_9h6k.jpg'
    },
    {
      id: 'gloves',
      name: 'Gloves & Mittens',
      image: 'https://i.etsystatic.com/11844026/r/il/fd9c73/2686542545/il_300x300.2686542545_2wmy.jpg'
    },
    {
      id: 'umbrellas',
      name: 'Umbrellas & Rain Accessories',
      image: 'https://i.etsystatic.com/21082441/r/il/f4c5e4/3485678901/il_300x300.3485678901_kl8p.jpg'
    },
    {
      id: 'watches',
      name: 'Watches',
      image: 'https://i.etsystatic.com/19305721/r/il/bc8e45/3156789012/il_300x300.3156789012_m9n2.jpg'
    },
    {
      id: 'wallets',
      name: 'Wallets & Money Clips',
      image: 'https://i.etsystatic.com/16789234/r/il/de7f56/2987654321/il_300x300.2987654321_p4q1.jpg'
    },
    {
      id: 'pins',
      name: 'Pins & Patches',
      image: 'https://i.etsystatic.com/14567890/r/il/ab1c23/3298765432/il_300x300.3298765432_r5s2.jpg'
    },
    {
      id: 'ties',
      name: 'Ties & Pocket Squares',
      image: 'https://i.etsystatic.com/17890123/r/il/cd2d34/3409876543/il_300x300.3409876543_t6u3.jpg'
    },
    {
      id: 'socks',
      name: 'Socks & Hosiery',
      image: 'https://i.etsystatic.com/18901234/r/il/ef3e45/3510987654/il_300x300.3510987654_v7w4.jpg'
    },
    {
      id: 'bags-charms',
      name: 'Bag Charms & Accessories',
      image: 'https://i.etsystatic.com/19012345/r/il/gh4f56/3621098765/il_300x300.3621098765_x8y5.jpg'
    },
    {
      id: 'cufflinks',
      name: 'Cufflinks & Tie Clips',
      image: 'https://i.etsystatic.com/20123456/r/il/ij5g67/3732109876/il_300x300.3732109876_z9a6.jpg'
    },
    {
      id: 'handkerchiefs',
      name: 'Handkerchiefs',
      image: 'https://i.etsystatic.com/21234567/r/il/kl6h78/3843210987/il_300x300.3843210987_b1c7.jpg'
    }
  ];

  allProducts: Product[] = [
    {
      id: 1,
      title: 'Personalized Kids Apron with Pockets, Custom Name Apron',
      price: 11.48,
      originalPrice: 22.97,
      discount: 50,
      rating: 5,
      reviews: 12543,
      image: 'assets/images/product1.jpg',
      seller: 'LittleAiLand',
      isStarSeller: true,
      freeShipping: false,
      adBySeller: false
    },
    {
      id: 2,
      title: 'Custom Embroidered Apron with Your Text - Personalized Gift',
      price: 9.90,
      originalPrice: 14.14,
      discount: 30,
      rating: 5,
      reviews: 62173,
      image: 'assets/images/product2.jpg',
      seller: 'AuraJewelsArt',
      isStarSeller: true,
      freeShipping: true,
      adBySeller: false
    },
    {
      id: 3,
      title: 'Custom Groomsmen Gifts, Groomsmen Proposal Gift',
      price: 9.71,
      originalPrice: 19.43,
      discount: 50,
      rating: 5,
      reviews: 2674,
      image: 'assets/images/product3.jpg',
      seller: 'CraftyCufflinkCorner',
      isStarSeller: true,
      freeShipping: true,
      adBySeller: false
    },
    {
      id: 4,
      title: 'Personalized Hair Claw Clip, Engraved Custom Name',
      price: 7.99,
      originalPrice: 9.99,
      discount: 20,
      rating: 5,
      reviews: 6212,
      image: 'assets/images/product4.jpg',
      seller: 'Shesli',
      isStarSeller: true,
      freeShipping: false,
      adBySeller: false
    },
    {
      id: 5,
      title: 'Vintage Keychain Set with Custom Engraving',
      price: 24.79,
      originalPrice: 49.57,
      discount: 50,
      rating: 4.8,
      reviews: 834,
      image: 'assets/images/product5.jpg',
      seller: 'VintageVault',
      isStarSeller: false,
      freeShipping: false,
      adBySeller: true
    },
    {
      id: 6,
      title: 'Handmade Velvet Hair Bow - Red & Green',
      price: 18.75,
      originalPrice: 25.00,
      discount: 25,
      rating: 4.9,
      reviews: 1523,
      image: 'assets/images/product6.jpg',
      seller: 'BowsByDesign',
      isStarSeller: true,
      freeShipping: false,
      adBySeller: true
    },
    {
      id: 7,
      title: 'Sterling Silver Ring Set - Minimalist Design',
      price: 19.50,
      originalPrice: 27.86,
      discount: 30,
      rating: 5,
      reviews: 945,
      image: 'assets/images/product7.jpg',
      seller: 'ModernMetals',
      isStarSeller: false,
      freeShipping: false,
      adBySeller: true
    },
    {
      id: 8,
      title: 'Custom Name Necklace - Personalized Jewelry',
      price: 6.00,
      originalPrice: 14.99,
      discount: 60,
      rating: 4.7,
      reviews: 2341,
      image: 'assets/images/product8.jpg',
      seller: 'JewelryMakers',
      isStarSeller: false,
      freeShipping: false,
      adBySeller: true
    },
    {
      id: 9,
      title: 'Leather Wallet with RFID Protection',
      price: 19.50,
      originalPrice: 27.86,
      discount: 30,
      rating: 5,
      reviews: 945,
      image: 'assets/images/product7.jpg',
      seller: 'ModernMetals',
      isStarSeller: false,
      freeShipping: false,
      adBySeller: true
    },
    {
      id: 10,
      title: 'Handcrafted Silk Scarf',
      price: 19.50,
      originalPrice: 27.86,
      discount: 30,
      rating: 5,
      reviews: 945,
      image: 'assets/images/product7.jpg',
      seller: 'ModernMetals',
      isStarSeller: false,
      freeShipping: false,
      adBySeller: true
    },
    {
      id: 11,
      title: 'Vintage Sunglasses Collection',
      price: 19.50,
      originalPrice: 27.86,
      discount: 30,
      rating: 5,
      reviews: 945,
      image: 'assets/images/product7.jpg',
      seller: 'ModernMetals',
      isStarSeller: false,
      freeShipping: false,
      adBySeller: true
    },
    {
      id: 12,
      title: 'Premium Leather Belt',
      price: 19.50,
      originalPrice: 27.86,
      discount: 30,
      rating: 5,
      reviews: 945,
      image: 'assets/images/product7.jpg',
      seller: 'ModernMetals',
      isStarSeller: false,
      freeShipping: false,
      adBySeller: true
    },
    {
      id: 13,
      title: 'Wool Winter Hat',
      price: 19.50,
      originalPrice: 27.86,
      discount: 30,
      rating: 5,
      reviews: 945,
      image: 'assets/images/product7.jpg',
      seller: 'ModernMetals',
      isStarSeller: false,
      freeShipping: false,
      adBySeller: true
    },
    {
      id: 14,
      title: 'Designer Watch Collection',
      price: 19.50,
      originalPrice: 27.86,
      discount: 30,
      rating: 5,
      reviews: 945,
      image: 'assets/images/product7.jpg',
      seller: 'ModernMetals',
      isStarSeller: false,
      freeShipping: false,
      adBySeller: true
    },
    {
      id: 15,
      title: 'Cashmere Gloves',
      price: 19.50,
      originalPrice: 27.86,
      discount: 30,
      rating: 5,
      reviews: 945,
      image: 'assets/images/product7.jpg',
      seller: 'ModernMetals',
      isStarSeller: false,
      freeShipping: false,
      adBySeller: true
    },
    {
      id: 16,
      title: 'Umbrella Set - Rain Collection',
      price: 19.50,
      originalPrice: 27.86,
      discount: 30,
      rating: 5,
      reviews: 945,
      image: 'assets/images/product7.jpg',
      seller: 'ModernMetals',
      isStarSeller: false,
      freeShipping: false,
      adBySeller: true
    },
        {
      id: 17,
      title: 'Designer Watch Collection',
      price: 19.50,
      originalPrice: 27.86,
      discount: 30,
      rating: 5,
      reviews: 945,
      image: 'assets/images/product7.jpg',
      seller: 'ModernMetals',
      isStarSeller: false,
      freeShipping: false,
      adBySeller: true
    },
    {
      id: 18,
      title: 'Designer Watch Collection',
      price: 19.50,
      originalPrice: 27.86,
      discount: 30,
      rating: 5,
      reviews: 945,
      image: 'assets/images/product7.jpg',
      seller: 'ModernMetals',
      isStarSeller: false,
      freeShipping: false,
      adBySeller: true
    },
    {
      id: 19,
      title: 'Designer Watch Collection',
      price: 19.50,
      originalPrice: 27.86,
      discount: 30,
      rating: 5,
      reviews: 945,
      image: 'assets/images/product7.jpg',
      seller: 'ModernMetals',
      isStarSeller: false,
      freeShipping: false,
      adBySeller: true
    },
    {
      id: 20,
      title: 'Designer Watch Collection',
      price: 19.50,
      originalPrice: 27.86,
      discount: 30,
      rating: 5,
      reviews: 945,
      image: 'assets/images/product7.jpg',
      seller: 'ModernMetals',
      isStarSeller: false,
      freeShipping: false,
      adBySeller: true
    },
        {
      id: 21,
      title: 'Designer Watch Collection',
      price: 19.50,
      originalPrice: 27.86,
      discount: 30,
      rating: 5,
      reviews: 945,
      image: 'assets/images/product7.jpg',
      seller: 'ModernMetals',
      isStarSeller: false,
      freeShipping: false,
      adBySeller: true
    },
        {
      id: 22,
      title: 'Designer Watch Collection',
      price: 19.50,
      originalPrice: 27.86,
      discount: 30,
      rating: 5,
      reviews: 945,
      image: 'assets/images/product7.jpg',
      seller: 'ModernMetals',
      isStarSeller: false,
      freeShipping: false,
      adBySeller: true
    },
        {
      id: 23,
      title: 'Designer Watch Collection',
      price: 19.50,
      originalPrice: 27.86,
      discount: 30,
      rating: 5,
      reviews: 945,
      image: 'assets/images/product7.jpg',
      seller: 'ModernMetals',
      isStarSeller: false,
      freeShipping: false,
      adBySeller: true
    },
    {
      id: 2,
      title: 'Designer Watch Collection',
      price: 19.50,
      originalPrice: 27.86,
      discount: 30,
      rating: 5,
      reviews: 945,
      image: 'assets/images/product7.jpg',
      seller: 'ModernMetals',
      isStarSeller: false,
      freeShipping: false,
      adBySeller: true
    },
    
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
    
    // Scroll to top عند تغيير الصفحة
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

  toggleCategories(): void {
    this.showMoreCategories = !this.showMoreCategories;
  }

  onSortChange(sortValue: string): void {
    this.sortBy = sortValue;
    this.sortProducts(sortValue);
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
}