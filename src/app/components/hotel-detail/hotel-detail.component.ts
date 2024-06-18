import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel.model';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {
  hotel: Hotel |undefined;
  error: string = '';
  urlImage: string = "";

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    if(id > 0) {
      this.apiService.getHotelById(id).subscribe({
        next: (data) => {
          this.hotel = data;
          this.urlImage = environment.host + '/download/' + data.id;
        },
        error: (err) => (this.error = err.message),
        complete: () => (this.error = '')
      })
    }
  }

  getStars(): number[] {
    if (this.hotel?.rating) {
      return Array(this.hotel.rating).fill(0).map((x, i) => i);
    } else {
      return [];
    }
  }

  navigateToHome() {
    this.router.navigateByUrl('hotels');
  }
}
