import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/city.model';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel } from 'src/app/models/hotel.model';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {

  listCities: City[] | undefined;
  error = null;
  showErrorMessage = false;
  showSuccessMessage = false;
  
  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.showErrorMessage = false;
    this.showSuccessMessage = false;
    this.getAllCities();
  }

    /**
   * Récupère toutes les villes en utilisant le service API et met à jour la liste des villes.
   */
    getAllCities(): void {
      this.apiService.getCities().subscribe({
        next: (data) => (this.listCities = data),
        error: (err) => (this.error = err.message),
        complete: () => (this.error = null)
      });
    }

    deleteCity(id: number): void {
      this.showErrorMessage = false;
      this.showSuccessMessage = false;
      if(confirm("Confirmer la suppression de cette ville ?")) {
        this.apiService.getHotelByCity(id).subscribe({
          next: (hotels) => {
            if (hotels.length > 0) {
              this.showErrorMessage = true;
            } else {
              this.apiService.deleteCity(id).subscribe({
                next: () => (this.showSuccessMessage = true),
                error: (err) => {
                  console.error('Error deleting city', err);
                  this.showErrorMessage = true;
                },
                complete: () => (this.getAllCities())
              });
            }
          },
          error: (err) => {
            console.error('Error fetching hotels', err);
            this.showErrorMessage = true;
          }
        });
      }
    }

    
    navigateToHome() {
      this.router.navigateByUrl('hotels');
    }

    navigateToCityForm(id:number) {
      this.router.navigateByUrl('cityForm/' + id);
    }
}
