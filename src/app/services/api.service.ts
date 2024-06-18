import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { City } from '../models/city.model';
import { Hotel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  /**
   * Récupère toutes les villes depuis l'API.
   * @returns Un tableau de villes.
  */
  public getCities() {
    return this.http.get<City[]>(environment.host + '/cities');
  }

  public getAllHotel() {
    return this.http.get<Hotel[]>(environment.host + '/hotels');
  }

  public getHotelByCity(id:number) {
    return this.http.get<Hotel[]>(environment.host + '/hotels/' + id);
  }
}
