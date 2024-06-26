import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Hotel } from 'src/app/models/hotel.model';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Input() hotel: Hotel | undefined;
  urlImage: string = "";

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.hotel) {
      this.urlImage = environment.host + '/download/' + this.hotel.id + '?' + new Date().getTime();
      this.cdr.detectChanges();
      console.log(this.hotel)
    }
  }

  getStars(): number[] {
    if (this.hotel?.rating) {
      return Array(this.hotel.rating).fill(0).map((x, i) => i);
    } else {
      return [];
    }
  }

  navigateToHotelDetail() {
    this.router.navigateByUrl('hotelDetail/' + this.hotel?.id);
  }

}
