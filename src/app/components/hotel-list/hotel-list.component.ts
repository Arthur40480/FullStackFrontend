import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel } from 'src/app/models/hotel.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {

  listHotel: Hotel[] | undefined;
  error = null;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAllCities()
  }

  getAllCities(): void {
    this.apiService.getAllHotel().subscribe({
      next: (data) => (this.listHotel = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null)
    });
  }

  /**
 * Navigue vers la page d'accueil.
 */
  navigateToHome() {
    this.router.navigateByUrl('hotels');
  }

  /**
 * Navigue vers le formulaire de modification d'un hôtel spécifiée par son identifiant.
 * @param id L'identifiant de l'hôtel à modifier.
 */
  navigateToHotelForm(id:number) {
    this.router.navigateByUrl('hotelForm/' + id);
  }
}
