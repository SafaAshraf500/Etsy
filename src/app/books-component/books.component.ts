import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule  } from '@angular/router';
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
  selector: 'app-books-component',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponentComponent implements OnInit {
  // ============ Properties ============
  sortBy: string = 'relevancy';
  showMoreCategories: boolean = false;
  totalItems: number = 1000;
  isDropdownOpen: boolean = false;
  searchQuery: string = '';
  filteredProducts: Product[] = [];
  
  products: Product[] = [];
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 3;
  pages: number[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  // ============ Sort Options ============
  sortOptions = [
    { value: 'relevancy', label: 'Relevancy' },
    { value: 'price-low', label: 'Lowest Price' },
    { value: 'price-high', label: 'Highest Price' },
    { value: 'reviews', label: 'Top Customer Reviews' },
    { value: 'newest', label: 'Most Recent' }
  ];

  categories: Category[] = [
    {
      id: 'accessories',
      name: 'Book Accessories',
      image: 'https://i.etsystatic.com/5695153/r/il/ab1c44/3272883407/il_300x300.3272883407_kd4e.jpg'
    },
    {
      id: 'books-sets',
      name: 'Book Sets & Collections',
      image: 'https://i.etsystatic.com/6212034/r/il/97aa96/6629256841/il_300x300.6629256841_caci.jpg'
    },
    {
      id: 'coloring',
      name: 'Coloring Books',
      image: 'https://i.etsystatic.com/5645164/c/2485/2485/0/303/il/308a51/6960370943/il_300x300.6960370943_8b2l.jpg'
    },
    {
      id: 'literature',
      name: 'Literature & Fiction',
      image: 'https://i.etsystatic.com/11230267/c/2941/2941/12/0/il/248223/6138304954/il_300x300.6138304954_29v2.jpg'
    },
    {
      id: 'religion',
      name: 'Religion & Spirituality Books',
      image: 'https://i.etsystatic.com/5411407/r/il/6006c8/6571000958/il_300x300.6571000958_gyp3.jpg'
    },
    {
      id: 'blank',
      name: 'Blank Books',
      image: 'https://i.etsystatic.com/6793453/r/il/d2eab4/6998175746/il_300x300.6998175746_6now.jpg'
    },
    {
      id: 'guides',
      name: 'Guides & How Tos',
      image: 'https://i.etsystatic.com/5184829/r/il/695cb2/5980724134/il_300x300.5980724134_amh2.jpg'
    },
    {
      id: 'calendars',
      name: 'Calendars & Planners',
      image: 'https://i.etsystatic.com/5438341/r/il/c6b96d/7129582439/il_300x300.7129582439_dze0.jpg'
    },
    {
      id: 'cookbooks',
      name: 'Cookbooks',
      image: 'https://i.etsystatic.com/5185360/c/2173/2173/421/516/il/c50c13/5009124075/il_300x300.5009124075_ecer.jpg'
    },
    {
      id: 'comics',
      name: 'Comics & Graphic Novels',
      image: 'https://i.etsystatic.com/5198553/r/il/8cbafb/1554489912/il_300x300.1554489912_1484.jpg'
    },
    {
      id: 'Children',
      name: "Children's Books",
      image: 'https://i.etsystatic.com/5175741/r/il/03f448/4720594502/il_300x300.4720594502_65p7.jpg'
    },
    {
      id: 'art',
      name: 'Art & Photography Books',
      image: 'https://i.etsystatic.com/5244103/r/il/53eeb6/5583409009/il_300x300.5583409009_dvhn.jpg'
    },
    {
      id: 'science',
      name: 'Science & Math Books',
      image: 'https://i.etsystatic.com/7203323/c/1678/1678/263/568/il/1acb4f/7389277948/il_300x300.7389277948_2y83.jpg'
    },
    {
      id: 'zines',
      name: 'Zines & Magazines',
      image: 'https://i.etsystatic.com/5198705/r/il/f3e27b/5097046263/il_300x300.5097046263_n3ed.jpg'
    },
    {
      id: 'history',
      name: 'History Books',
      image: 'https://i.etsystatic.com/5411407/r/il/1166e6/6484886966/il_300x300.6484886966_iunv.jpg'
    },
    {
      id: 'audiobooks',
      name: 'Audiobooks',
      image: 'https://i.etsystatic.com/6055445/r/il/c84926/7389590758/il_300x300.7389590758_3ong.jpg'
    },
    {
      id: 'reference Books',
      name: 'Reference Books',
      image: 'https://i.etsystatic.com/5376867/r/il/10deb8/2811157230/il_300x300.2811157230_pldo.jpg'
    },
    {
      id: 'biographies',
      name: 'Biographies & Autobiographies',
      image: 'https://i.etsystatic.com/5909219/r/il/841046/4024786572/il_300x300.4024786572_94g5.jpg'
    },
    {
      id: 'poetry',
      name: 'Poetry Books',
      image: 'https://i.etsystatic.com/5683970/r/il/90bab8/1314237912/il_300x300.1314237912_acbf.jpg'
    },
    {
      id: 'fitness',
      name: 'Health & Fitness Books',
      image: 'https://i.etsystatic.com/5411407/r/il/6417fe/5616883722/il_300x300.5616883722_4vo4.jpg'
    },
    {
      id: 'humor',
      name: 'Humor Books',
      image: 'https://i.etsystatic.com/11855151/r/il/3fd999/7394454280/il_300x300.7394454280_he6v.jpg'
    },
    {
      id: 'craft',
      name: 'Craft & Hobby Books',
      image: 'https://i.etsystatic.com/5271402/r/il/c525ed/1400534722/il_300x300.1400534722_7red.jpg'
    },
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
    // باقي المنتجات...
  ];

  ngOnInit(): void {
    this.filteredProducts = [...this.allProducts];
    this.calculateTotalPages();
    this.loadProducts();
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const dropdown = target.closest('.sort-container');
    if (!dropdown) {
      this.isDropdownOpen = false;
    }
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectSort(value: string, event: Event): void {
    event.stopPropagation();
    this.sortBy = value;
    this.isDropdownOpen = false;
    this.onSortChange(value);
  }

  getSortLabel(): string {
    const opt = this.sortOptions.find(o => o.value === this.sortBy);
    return opt ? opt.label : 'Relevancy';
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

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadProducts();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProducts();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  toggleCategories(): void {
    this.showMoreCategories = !this.showMoreCategories;
  }

  onSortChange(sortValue: string): void {
    this.sortBy = sortValue;
    switch(sortValue) {
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
      default:
        this.filteredProducts = [...this.allProducts];
        break;
    }
    this.currentPage = 1;
    this.calculateTotalPages();
    this.loadProducts();
  }

  addToFavorites(product: Product, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    const added = this.favoritesService.addToFavorites(product);
    
    if (!added) {
      this.favoritesService.removeFromFavorites(product.id);
    }
  }

  isFavorite(productId: number): boolean {
    return this.favoritesService.isFavorite(productId);
  }

  goToFavorites(): void {
    this.router.navigate(['/favorites']);
  }

  // ✅ الدالة الصح للسيرش
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
    this.filteredProducts = [...this.allProducts];
    this.currentPage = 1;
    this.calculateTotalPages();
    this.loadProducts();
  }
}