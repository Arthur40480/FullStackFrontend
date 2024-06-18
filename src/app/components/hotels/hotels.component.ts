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
  listFilteredHotels: any[] = [];
  idSelectedCity: number | null = null;
  nameCitySelected: string = '';
  keyword: string = '';

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
  getAllCities(): void {
    this.apiService.getCities().subscribe({
      next: (data) => (this.listCity = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null)
    });
  }

  /**
   * Récupère tous les hôtels en utilisant le service API et met à jour la liste des hôtels.
   * Réinitialise la ville sélectionnée à 'Toutes' et efface la ville sélectionnée du service CityService.
   */
  getAllHotel(): void {
    this.apiService.getAllHotel().subscribe({
      next: (data) => {
        this.listHotel = data;
        this.listFilteredHotels = data;
        this.idSelectedCity = 0; 
        this.nameCitySelected = "Toutes";
        this.cityService.clearSelectedIdCity();
        this.cityService.clearSelectedNameCity();
      },
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null)
    });
  }

  /**
   * Récupère tous les hôtels par ville en utilisant le service API et met à jour la liste des hôtels.
   * Définit la ville sélectionnée dans le service CityService.
   * @param id ID de la ville sélectionnée
   * @param name Nom de la ville sélectionnée
   */
  getAllHotelByCity(id: number, name: string): void {
    this.apiService.getHotelByCity(id).subscribe({
      next: (data) => (this.listHotel = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
    this.cityService.setSelectedIdCity(id);
    this.cityService.setSelectedNameCity(name);
    this.nameCitySelected = name;
    this.idSelectedCity = id;
  }

  /**
   * Filtre les hôtels en fonction du mot-clé saisi dans la barre de recherche.
   */
  filterHotel(): void {
    if (this.keyword === '') {
      this.listHotel = this.listFilteredHotels; 
    } else {
      this.listHotel = this.listFilteredHotels?.filter((hotel) =>
        hotel.name.toLowerCase().includes(this.keyword)
      );
    }
  }

  /**
   * Déclenchée lorsqu'une recherche est effectuée à partir de l'interface utilisateur.
   * Met à jour le mot-clé de recherche et applique le filtre sur les hôtels.
   */
  onSearch(): void {
    let recherche: string = (
      document.getElementById('rechercheHotel') as HTMLInputElement
    ).value.toLowerCase();
    this.keyword = recherche;
    this.filterHotel();
  }
}