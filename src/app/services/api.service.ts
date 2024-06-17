import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { City } from '../models/city.model';

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
}
