import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shoes',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './shoes.component.html',
  styleUrl: './shoes.component.css'
})
export class ShoesComponent  {
  showAll: boolean = false;
  shoes = [
    { title: 'Boots', img: 'https://i.etsystatic.com/11657093/r/il/58648b/5223054101/il_570xN.5223054101_7ov7.jpg' },
    { title: 'Pumps', img: 'https://i.etsystatic.com/23222295/r/il/8821de/4460880078/il_fullxfull.4460880078_3d2l.jpg' },
    { title: 'Mary Janes', img: 'https://i.etsystatic.com/10731543/r/il/4bf9dd/1617459987/il_fullxfull.1617459987_8g6v.jpg' },
    { title: 'Slip Ons', img: 'https://i.etsystatic.com/35536603/r/il/8fee06/6336865820/il_fullxfull.6336865820_5r92.jpg' },
    { title: 'Oxfords & Tie Shoes', img: 'https://i.etsystatic.com/60704233/r/il/c19144/7233754066/il_1588xN.7233754066_dwzz.jpg' },
    { title: 'Slippers', img: 'https://i.etsystatic.com/54475101/r/il/11f20a/7273066436/il_1588xN.7273066436_3dwt.jpg' },
    { title: 'Sandals', img: 'https://i.etsystatic.com/34166602/r/il/a1d2f1/6621164238/il_1588xN.6621164238_mubw.jpg' },
    { title: 'Sneakers & Athletic Shoes', img: 'https://i.etsystatic.com/27030135/r/il/5e8f3c/4667314876/il_1588xN.4667314876_1ifz.jpg' },
    { title: 'Costume Shoes', img: 'https://i.etsystatic.com/16852813/r/il/e1ccf1/2263338897/il_1588xN.2263338897_pj3o.jpg' },
    { title: 'Clogs & Mules', img: 'https://i.etsystatic.com/15895592/r/il/d0dc23/6873136856/il_1588xN.6873136856_h0p1.jpg' }
  ];

  get visibleShoes() {
    return this.showAll ? this.shoes : this.shoes.slice(0, 6);
  }

  toggleShow() {
    this.showAll = !this.showAll;
  }


  
}
