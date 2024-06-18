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

  public getHotelById(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${environment.host}/hotel/${id}`);
  }

  public saveHotel(hotel: any) {
    return this.http.post<Hotel>(`${environment.host}/hotel`, hotel)
  }

  public getCityById(id:number): Observable<City>{
    return this.http.get<City>(`${environment.host}/city/${id}`);
  }

  public saveCity(city: any) {
    return this.http.post<City>(`${environment.host}/city`, city)
  }

  public deleteCity(id:number) {
    return this.http.delete(`${environment.host}/city/${id}`)
  }

  public postImg(formData: FormData) {
    return this.http.post<any>(`${environment.host}/download`, formData);
  }
}
