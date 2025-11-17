import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shoe-details',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './shoe-details.component.html',
  styleUrl: './shoe-details.component.css'
})
export class ShoeDetailsComponent implements OnInit {

  product: any = null;
  id!: string;

  constructor(private route: ActivatedRoute, private service: ProductService) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;

  this.service.getItemById(this.id).subscribe((res: any) => {
  console.log("PRODUCT DATA:", res.data);
  this.product = res.data;
});

  }

}
