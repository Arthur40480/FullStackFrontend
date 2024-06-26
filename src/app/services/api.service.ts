import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { City } from '../models/city.model';
import { Hotel } from '../models/hotel.model';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Manager } from '../models/manager.model';

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

  public getHotelByManager(id: number): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${environment.host}/manager/${id}/hotels`)
  }
  
  public getManagerByHotel(id: number) {
    return this.http.get<Manager[]>(`${environment.host}/managers/${id}`)
  }

  public getManagerByUsername(username: string) {
    return this.http.get<Manager>(`${environment.host}/username`, { params: { username } });
}

  public saveHotel(hotel: any) {
    return this.http.post<any>(`${environment.host}/hotel`, hotel)
  }

  public saveManager(username: any) {
    return this.http.post<Manager>(`${environment.host}/manager`, username)
  }

  public updateManager(id:number, username:any) {
    return this.http.post<Manager>(`${environment.host}/manager/${id}`, username)
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

  public deleteHotel(id:number) {
    return this.http.delete(`${environment.host}/hotel/${id}`)
  }

  public deleteManager(id: number) {
    return this.http.delete(`${environment.host}/manager/${id}`)
  }

  public postImg(formData: FormData) {
    return this.http.post<any>(`${environment.host}/download`, formData);
  }

  public getToken(username: string, password: string): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return this.http.post<any>(environment.host + '/login', formData, {
      observe: 'response',
    });
  }

  public getAllManagers(): Observable<Manager[]> {
    return this.http.get<Manager[]>(`${environment.host}/managers`)
  }

  public getManagerById(id: number): Observable<Manager> {
    return this.http.get<Manager>(`${environment.host}/user/${id}`)
  }

  public assignHotelToManager(idManager: number, idHotel: number) {
    return this.http.get<Hotel>(`${environment.host}/assign/${idManager}/${idHotel}`)
  }

  public removeHotelToManager(idManager: number, idHotel: number) {
    return this.http.get<Hotel>(`${environment.host}/remove/${idManager}/${idHotel}`)
  }

}
