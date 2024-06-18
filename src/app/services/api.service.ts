import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { City } from '../models/city.model';
import { Hotel } from '../models/hotel.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  /**
   * Récupère toutes les villes depuis l'API.
   * @returns Un Observable contenant un tableau de villes.
   */
  public getCities(): Observable<City[]> {
    return this.http.get<City[]>(`${environment.host}/cities`);
  }

  /**
   * Récupère tous les hôtels depuis l'API.
   * @returns Un Observable contenant un tableau d'hôtels.
   */
  public getAllHotel(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${environment.host}/hotels`);
  }

  /**
   * Récupère tous les hôtels d'une ville spécifique depuis l'API.
   * @param id L'ID de la ville pour laquelle récupérer les hôtels.
   * @returns Un Observable contenant un tableau d'hôtels de la ville spécifiée.
   */
  public getHotelByCity(id: number): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${environment.host}/hotels/${id}`);
  }
}
