import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { ApiService } from './api.service';
import { jwtDecode } from 'jwt-decode';

/**
 * Service pour les opérations liées à l'authentification.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  /**
   * Tableau d'utilisateurs.
   */
  private users: User[] | undefined;

  /**
   * Utilisateur actuellement connecté.
   */
  userConnected: User = new User('', '', []);

  /**
   * Constructeur du service d'authentification.
   * @param apiService Instance de ApiService.
   */
  constructor(private apiService: ApiService) {}

  /**
   * Récupérer l'utilisateur du stockage local s'il existe, sinon retourner un utilisateur vide.
   * @returns Objet User.
   */
  getUser() {
    let user = localStorage.getItem('user');
    if (user) {
      // S'il y a déjà un utilisateur dans le stockage local, alors l'utilisateur est connecté
      this.userConnected = JSON.parse(atob(user)); // Déchiffrement
    }
    return this.userConnected;
  }

  /**
   * Vérifier si un utilisateur est connecté.
   * @returns True si l'utilisateur est connecté, sinon false.
   */
  isConnected() {
    return localStorage.getItem('user') != null;
  }

  /**
   * Déconnecter l'utilisateur.
   */
  disconnected() {
    localStorage.removeItem('user');
    this.userConnected = new User('', '', []);
  }

  /**
   * Vérifier si l'utilisateur connecté est un administrateur.
   * @returns True si l'utilisateur est un administrateur, sinon false.
   */
  isAdmin() {
    let user = this.getUser();
    if (user.roles.length > 0) {
      if (user.roles.indexOf('ADMIN') > -1) return true;
    }
    return false;
  }

  /**
   * Vérifier si l'utilisateur connecté est un utilisateur régulier.
   * @returns True si l'utilisateur est un utilisateur régulier, sinon false.
   */
  isUser() {
    let user = this.getUser();
    if (user.roles.length > 0) {
      if (user.roles.indexOf('USER') > -1) return true;
    }
    return false;
  }

  /**
   * Stocker le jeton JWT dans le stockage local.
   * @param token Jeton JWT.
   */
  setToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  /**
   * Récupérer le jeton JWT du stockage local.
   * @returns Jeton JWT ou null si non trouvé.
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Décoder le jeton JWT.
   * @returns Jeton décodé ou null si le jeton n'est pas trouvé.
   */
  decodeToken(): any {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token) as any;
    }
    return null;
  }

  /**
   * Vérifier si l'utilisateur possède le rôle d'administrateur.
   * @returns True si l'utilisateur est un administrateur, sinon false.
   */
  isAdminToken(): boolean {
    const decodedToken = this.decodeToken();
    if (decodedToken) {
      return decodedToken.roles.includes('ADMIN');
    }
    return false;
  }

  /**
   * Vérifier si l'utilisateur possède le rôle d'utilisateur régulier.
   * @returns True si l'utilisateur est un utilisateur régulier, sinon false.
   */
  isUserToken(): boolean {
    const decodedToken = this.decodeToken();
    if (decodedToken) {
      return decodedToken.roles.includes('USER');
    }
    return false;
  }

  /**
   * Vérifier si l'utilisateur possède le rôle de gestionnaire d'hôtel'.
   * @returns True si l'utilisateur est un gestionnaire d'hôtel, sinon false.
   */
  isHotelManagerToken(): boolean {
    const decodedToken = this.decodeToken();
    if (decodedToken) {
      return decodedToken.roles.includes('HOTEL_MANAGER');
    }
    return false;
  }

  /**
   * Récupérer le nom d'utilisateur du jeton décodé.
   * @returns Le nom d'utilisateur ou undefined si le jeton n'est pas trouvé.
   */
  UsernameToken() {
    const decodedToken = this.decodeToken();
    if (decodedToken) {
      return decodedToken.sub;
    }
  }

  /**
   * Vérifier si un utilisateur est connecté.
   * @returns True si l'utilisateur est connecté, sinon false.
   */
  isConnectedToken(): boolean {
    return this.getToken() !== null;
  }

  /**
   * Déconnecter l'utilisateur.
   */
  disconnectedToken() {
    localStorage.removeItem('authToken');
    this.userConnected = new User('', '', []);
  }
}
