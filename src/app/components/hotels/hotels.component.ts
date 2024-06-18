import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/city.model';
import { Hotel } from 'src/app/models/hotel.model';
import { ApiService } from 'src/app/services/api.service';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {

  error = null;
  listCity: City[] | undefined;
  listHotel: Hotel[] | undefined;
  idSelectedCity: number | null = null;
  nameCitySelected: string = '';

  constructor(private apiService: ApiService, private cityService: CityService) { 
  
  }

  ngOnInit(): void {
    this.idSelectedCity = this.cityService.getSelectedIdCity();
    this.nameCitySelected = this.cityService.getSelectedNameCity();
    this.getAllHotel();
    if(this.idSelectedCity == 0) {
      this.getAllCities();
    }
  }

  /**
  * Récupère toutes les villes en utilisant le service API et met à jour la liste des villes.
  */
  getAllCities() {
    this.apiService.getCities().subscribe({
      next: (data) => (this.listCity = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null)
    })
  }

  getAllHotel() {
    this.apiService.getAllHotel().subscribe({
      next: (data) => {
        this.listHotel = data;
        this.idSelectedCity = 0; 
        this.nameCitySelected = "Toutes";
        this.cityService.clearSelectedIdCity();
        this.cityService.clearSelectedNameCity();
      },
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null)
    })
  }

  getAllHotelByCity(id: number, name: string) {
    this.apiService.getHotelByCity(id).subscribe({
      next: (data) => (this.listHotel = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    })
      this.cityService.setSelectedIdCity(id);
      this.cityService.setSelectedNameCity(name);
      this.nameCitySelected = name;
      this.idSelectedCity = id;
  }

}
