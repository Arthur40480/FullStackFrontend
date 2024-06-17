import { Injectable } from '@angular/core';

/**
 * Service de gestion de la ville sélectionnée.
 */
@Injectable({
  providedIn: 'root',
})
export class CityService {
  /**
   * ID de la ville sélectionnée.
   */
  private selectedIdCity: number;

  /**
   * Nom de la ville sélectionnée.
   */
  private selectedNameCity: string;

  /**
   * Constructeur du service CityService.
   * Initialise l'ID sélectionné à 0 et le nom sélectionné à 'Toutes'.
   */
  constructor() {
    this.selectedIdCity = 0;
    this.selectedNameCity = 'Toutes';
  }

  /**
   * Obtient l'ID de la ville sélectionnée.
   * @returns ID de la ville sélectionnée.
   */
  getSelectedIdCity(): number {
    return this.selectedIdCity;
  }

  /**
   * Obtient le nom de la ville sélectionnée.
   * @returns Nom de la ville sélectionnée.
   */
  getSelectedNameCity(): string {
    return this.selectedNameCity;
  }

  /**
   * Définit l'ID de la ville sélectionnée.
   * @param id ID de la ville à définir.
   */
  setSelectedIdCity(id: number) {
    this.selectedIdCity = id;
  }

  /**
   * Définit le nom de la ville sélectionnée.
   * @param name Nom de la ville à définir.
   */
  setSelectedNameCity(name: string) {
    this.selectedNameCity = name;
  }

  /**
   * Réinitialise l'ID de la ville sélectionnée à 0.
   */
  clearSelectedIdCity() {
    this.selectedIdCity = 0;
  }

  /**
   * Réinitialise le nom de la ville sélectionnée à 'Toutes'.
   */
  clearSelectedNameCity() {
    this.selectedNameCity = 'Toutes';
  }
}