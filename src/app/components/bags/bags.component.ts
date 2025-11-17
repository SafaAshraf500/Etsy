import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bags',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './bags.component.html',
  styleUrl: './bags.component.css'
})
export class BagsComponent {
  showAll: boolean = false;
  bags = [
    { title: 'Crossbody Bags', img: 'https://i.etsystatic.com/16658906/r/il/2080c9/2510993609/il_1588xN.2510993609_8ma5.jpg' },
    { title: 'Clutches & Evening Bags', img: 'https://i.etsystatic.com/62693878/r/il/1a8398/7381671806/il_1588xN.7381671806_pszz.jpg' },
    { title: 'Shoulder Bags', img: 'https://i.etsystatic.com/52029263/r/il/5aa42a/5990757174/il_1588xN.5990757174_jq6k.jpg' },
    { title: 'Hobo Bags', img: 'https://i.etsystatic.com/62228376/r/il/50ee7b/7392682672/il_1588xN.7392682672_hdk5.jpg' },
    { title: 'Top Handle Bags', img: 'https://i.etsystatic.com/53448371/r/il/2bb133/7432649469/il_1588xN.7432649469_6met.jpg' },
    { title: 'Purse Straps', img: 'https://i.etsystatic.com/43343917/r/il/a9e30b/6848314194/il_1588xN.6848314194_gkuf.jpg' },
    { title: 'Purse Inserts', img: 'https://i.etsystatic.com/15528954/r/il/5186ae/7229822756/il_1588xN.7229822756_ecgi.jpg' },
    { title: 'Wristlets', img: 'https://i.etsystatic.com/62639371/r/il/8ceba8/7453257299/il_680x540.7453257299_p74f.jpg' },
    { title: 'Potli Bags', img: 'https://i.etsystatic.com/23655784/r/il/59b38c/5994582512/il_1588xN.5994582512_jtkr.jpg' },
  ];

  get visibleBags() {
    return this.showAll ? this.bags : this.bags.slice(0, 6);
  }

  toggleShow() {
    this.showAll = !this.showAll;
  }

}
