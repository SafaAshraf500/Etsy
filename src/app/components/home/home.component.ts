import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit {
  
  // Slider 1 - Custom Christmas Cheer
  products1 = [
    { image: 'https://i.etsystatic.com/60120611/c/1315/1315/329/372/il/309d1a/7342289224/il_600x600.7342289224_5g18.jpg', price: 3.89, oldPrice: 9.73 },
    { image: 'https://i.etsystatic.com/28369201/c/1210/1210/285/612/il/06538b/7263342664/il_600x600.7263342664_acs2.jpg', price: 3.89, oldPrice: 9.73 },
    { image: 'https://i.etsystatic.com/56444991/r/il/f2317c/7333469813/il_600x600.7333469813_fvhk.jpg', price: 3.89, oldPrice: 9.73 },
    { image: 'https://i.etsystatic.com/60120611/c/1307/1307/352/407/il/981468/7390785985/il_600x600.7390785985_kwqj.jpg', price: 3.89, oldPrice: 9.73 },
    { image: 'https://i.etsystatic.com/44101227/c/1904/1904/0/76/il/13eaa1/7339838824/il_600x600.7339838824_28xo.jpg', price: 3.89, oldPrice: 9.73 },
    { image: 'https://i.etsystatic.com/43493810/r/il/a56a8d/7370192825/il_600x600.7370192825_d71k.jpg', price: 4.50, oldPrice: 10.00 },
    { image: 'https://i.etsystatic.com/28369201/c/1317/1317/224/435/il/ef5654/7301961816/il_300x300.7301961816_im1a.jpg', price: 3.89, oldPrice: 9.73 },
    { image: 'https://i.etsystatic.com/54961636/r/il/138c01/7390012209/il_300x300.7390012209_lscd.jpg', price: 3.89, oldPrice: 9.73 },
  ];

  // Slider 2 - Handmade Jewelry
  products2 = [
    { image: 'https://i.etsystatic.com/25890105/c/1904/1904/64/54/il/ed0c04/7280230579/il_300x300.7280230579_h2ar.jpg', price: 25.99, oldPrice: 45.00 },
    { image: 'https://i.etsystatic.com/56286191/c/1754/1754/81/122/il/7c359e/7332484246/il_300x300.7332484246_1d3c.jpg', price: 32.50, oldPrice: 60.00 },
    { image: 'https://i.etsystatic.com/57699875/c/1153/1153/417/243/il/e662f6/7226181256/il_300x300.7226181256_bwjz.jpg', price: 18.99, oldPrice: 35.00 },
    { image: 'https://i.etsystatic.com/57464252/r/il/2190ec/7309856720/il_300x300.7309856720_hxlw.jpg', price: 28.75, oldPrice: 52.00 },
    { image: 'https://i.etsystatic.com/60120611/c/1315/1315/329/372/il/309d1a/7342289224/il_600x600.7342289224_5g18.jpg', price: 22.00, oldPrice: 40.00 },
    { image: 'https://i.etsystatic.com/28369201/c/1210/1210/285/612/il/06538b/7263342664/il_600x600.7263342664_acs2.jpg', price: 35.99, oldPrice: 65.00 },
    { image: 'https://i.etsystatic.com/56444991/r/il/f2317c/7333469813/il_600x600.7333469813_fvhk.jpg', price: 29.50, oldPrice: 55.00 },
  ];

  // Slider 3 - Home Decor
  products3 = [
    { image: 'https://i.etsystatic.com/60120611/c/1307/1307/352/407/il/981468/7390785985/il_600x600.7390785985_kwqj.jpg', price: 45.00, oldPrice: 80.00 },
    { image: 'https://i.etsystatic.com/44101227/c/1904/1904/0/76/il/13eaa1/7339838824/il_600x600.7339838824_28xo.jpg', price: 52.99, oldPrice: 95.00 },
    { image: 'https://i.etsystatic.com/43493810/r/il/a56a8d/7370192825/il_600x600.7370192825_d71k.jpg', price: 38.50, oldPrice: 70.00 },
    { image: 'https://i.etsystatic.com/28369201/c/1317/1317/224/435/il/ef5654/7301961816/il_300x300.7301961816_im1a.jpg', price: 48.75, oldPrice: 88.00 },
    { image: 'https://i.etsystatic.com/54961636/r/il/138c01/7390012209/il_300x300.7390012209_lscd.jpg', price: 55.00, oldPrice: 100.00 },
    { image: 'https://i.etsystatic.com/25890105/c/1904/1904/64/54/il/ed0c04/7280230579/il_300x300.7280230579_h2ar.jpg', price: 42.99, oldPrice: 78.00 },
  ];

  // Slider 4 - Vintage Finds
  products4 = [
    { image: 'https://i.etsystatic.com/56286191/c/1754/1754/81/122/il/7c359e/7332484246/il_300x300.7332484246_1d3c.jpg', price: 65.00, oldPrice: 120.00 },
    { image: 'https://i.etsystatic.com/57699875/c/1153/1153/417/243/il/e662f6/7226181256/il_300x300.7226181256_bwjz.jpg', price: 78.50, oldPrice: 140.00 },
    { image: 'https://i.etsystatic.com/57464252/r/il/2190ec/7309856720/il_300x300.7309856720_hxlw.jpg', price: 55.99, oldPrice: 105.00 },
    { image: 'https://i.etsystatic.com/60120611/c/1315/1315/329/372/il/309d1a/7342289224/il_600x600.7342289224_5g18.jpg', price: 82.00, oldPrice: 150.00 },
    { image: 'https://i.etsystatic.com/28369201/c/1210/1210/285/612/il/06538b/7263342664/il_600x600.7263342664_acs2.jpg', price: 68.75, oldPrice: 125.00 },
    { image: 'https://i.etsystatic.com/56444991/r/il/f2317c/7333469813/il_600x600.7333469813_fvhk.jpg', price: 72.50, oldPrice: 135.00 },
    { image: 'https://i.etsystatic.com/60120611/c/1307/1307/352/407/il/981468/7390785985/il_600x600.7390785985_kwqj.jpg', price: 88.99, oldPrice: 160.00 },
  ];

  // Slider 5 - Art Prints
  products5 = [
    { image: 'https://i.etsystatic.com/44101227/c/1904/1904/0/76/il/13eaa1/7339838824/il_600x600.7339838824_28xo.jpg', price: 15.99, oldPrice: 30.00 },
    { image: 'https://i.etsystatic.com/43493810/r/il/a56a8d/7370192825/il_600x600.7370192825_d71k.jpg', price: 18.50, oldPrice: 35.00 },
    { image: 'https://i.etsystatic.com/28369201/c/1317/1317/224/435/il/ef5654/7301961816/il_300x300.7301961816_im1a.jpg', price: 22.00, oldPrice: 42.00 },
    { image: 'https://i.etsystatic.com/54961636/r/il/138c01/7390012209/il_300x300.7390012209_lscd.jpg', price: 19.75, oldPrice: 38.00 },
    { image: 'https://i.etsystatic.com/25890105/c/1904/1904/64/54/il/ed0c04/7280230579/il_300x300.7280230579_h2ar.jpg', price: 24.99, oldPrice: 48.00 },
    { image: 'https://i.etsystatic.com/56286191/c/1754/1754/81/122/il/7c359e/7332484246/il_300x300.7332484246_1d3c.jpg', price: 16.50, oldPrice: 32.00 },
  ];

  // Slider 6 - Handmade Bags
  products6 = [
    { image: 'https://i.etsystatic.com/57699875/c/1153/1153/417/243/il/e662f6/7226181256/il_300x300.7226181256_bwjz.jpg', price: 89.00, oldPrice: 160.00 },
    { image: 'https://i.etsystatic.com/57464252/r/il/2190ec/7309856720/il_300x300.7309856720_hxlw.jpg', price: 95.50, oldPrice: 175.00 },
    { image: 'https://i.etsystatic.com/60120611/c/1315/1315/329/372/il/309d1a/7342289224/il_600x600.7342289224_5g18.jpg', price: 78.99, oldPrice: 145.00 },
    { image: 'https://i.etsystatic.com/28369201/c/1210/1210/285/612/il/06538b/7263342664/il_600x600.7263342664_acs2.jpg', price: 102.00, oldPrice: 185.00 },
    { image: 'https://i.etsystatic.com/56444991/r/il/f2317c/7333469813/il_600x600.7333469813_fvhk.jpg', price: 85.75, oldPrice: 155.00 },
    { image: 'https://i.etsystatic.com/60120611/c/1307/1307/352/407/il/981468/7390785985/il_600x600.7390785985_kwqj.jpg', price: 92.50, oldPrice: 170.00 },
    { image: 'https://i.etsystatic.com/44101227/c/1904/1904/0/76/il/13eaa1/7339838824/il_600x600.7339838824_28xo.jpg', price: 98.99, oldPrice: 180.00 },
  ];

  // Slider 7 - Gift Ideas
  products7 = [
    { image: 'https://i.etsystatic.com/43493810/r/il/a56a8d/7370192825/il_600x600.7370192825_d71k.jpg', price: 12.99, oldPrice: 25.00 },
    { image: 'https://i.etsystatic.com/28369201/c/1317/1317/224/435/il/ef5654/7301961816/il_300x300.7301961816_im1a.jpg', price: 15.50, oldPrice: 30.00 },
    { image: 'https://i.etsystatic.com/54961636/r/il/138c01/7390012209/il_300x300.7390012209_lscd.jpg', price: 18.00, oldPrice: 35.00 },
    { image: 'https://i.etsystatic.com/25890105/c/1904/1904/64/54/il/ed0c04/7280230579/il_300x300.7280230579_h2ar.jpg', price: 14.75, oldPrice: 28.00 },
    { image: 'https://i.etsystatic.com/56286191/c/1754/1754/81/122/il/7c359e/7332484246/il_300x300.7332484246_1d3c.jpg', price: 20.99, oldPrice: 40.00 },
    { image: 'https://i.etsystatic.com/57699875/c/1153/1153/417/243/il/e662f6/7226181256/il_300x300.7226181256_bwjz.jpg', price: 16.50, oldPrice: 32.00 },
    { image: 'https://i.etsystatic.com/57464252/r/il/2190ec/7309856720/il_300x300.7309856720_hxlw.jpg', price: 22.00, oldPrice: 42.00 },
    { image: 'https://i.etsystatic.com/60120611/c/1315/1315/329/372/il/309d1a/7342289224/il_600x600.7342289224_5g18.jpg', price: 13.99, oldPrice: 27.00 },
  ];

  // عناوين الـ sliders
  sliderTitles = [
    'Custom Christmas Cheer',
    'Handmade Jewelry Collection',
    'Home Decor Essentials',
    'Vintage Finds',
    'Art Prints & Posters',
    'Handmade Leather Bags',
    'Perfect Gift Ideas'
  ];

  currentSlides: number[] = [];
  visibleSlides = 4;
  allProducts: any[][] = [];

  ngOnInit() {

    this.allProducts = [
      this.products1,
      this.products2,
      this.products3,
      this.products4,
      this.products5,
      this.products6,
      this.products7
    ];
    
    this.currentSlides = Array(7).fill(0);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      for (let i = 0; i < 7; i++) {
        this.updateTransform(i);
      }
    }, 0);
  }

  prevSlide(sliderIndex: number) {
    if (this.currentSlides[sliderIndex] > 0) {
      this.currentSlides[sliderIndex]--;
      this.updateTransform(sliderIndex);
    }
  }

  nextSlide(sliderIndex: number) {
    const totalSlides = this.allProducts[sliderIndex].length;
    
    if (this.currentSlides[sliderIndex] < totalSlides - this.visibleSlides) {
      this.currentSlides[sliderIndex]++;
      this.updateTransform(sliderIndex);
    }
  }

  updateTransform(sliderIndex: number) {
    const sliderContainers = document.querySelectorAll('.products-slider');
    const slider = sliderContainers[sliderIndex] as HTMLElement;
    if (!slider) return;

    const container = slider.querySelector('.slides-container') as HTMLElement;
    const slide = container.querySelector('.slide') as HTMLElement;
    if (!container || !slide) return;

    const slideWidth = slide.offsetWidth + 10;
    const totalSlides = this.allProducts[sliderIndex].length;
    
    container.style.transform = `translateX(-${this.currentSlides[sliderIndex] * slideWidth}px)`;
    container.style.transition = 'transform 0.3s ease-in-out';

    const prevBtn = slider.querySelector('.prev') as HTMLElement;
    const nextBtn = slider.querySelector('.next') as HTMLElement;

    if (prevBtn) prevBtn.style.display = this.currentSlides[sliderIndex] === 0 ? 'none' : 'flex';
    if (nextBtn) nextBtn.style.display = this.currentSlides[sliderIndex] >= totalSlides - this.visibleSlides ? 'none' : 'flex';
  }
}