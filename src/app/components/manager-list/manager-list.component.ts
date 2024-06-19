import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { Manager } from 'src/app/models/manager.model';

@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.css']
})
export class ManagerListComponent implements OnInit {

  listManager: Manager[] | undefined;
  error = null;
  showErrorMessage = false;
  showSuccessMessage = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getManagers();
  }

  getManagers(): void {
    this.apiService.getAllManagers().subscribe({
      next: (data) => (this.listManager = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null)
    })
  }

    /**
 * Navigue vers la page d'accueil.
 */
    navigateToHome() {
      this.router.navigateByUrl('hotels');
    }

      /**
 * Navigue vers le formulaire de modification d'un manager spécifiée par son identifiant.
 * @param id L'identifiant du manager à modifier.
 */
  navigateToManagerForm(id:number) {
    this.router.navigateByUrl('managerForm/' + id);
  }

  deleteManager(id: number) {
    this.showErrorMessage = false;
    this.showSuccessMessage = false;
    if(confirm("Confirmer la suppression de cette ville ?")) {
      this.apiService.getHotelByManager(id).subscribe({
        next:(hotels) => {
          if(hotels.length > 0) {
            this.showErrorMessage = true;
          }else {
            this.apiService.deleteManager(id).subscribe({
              next: () => (this.showSuccessMessage = true),
              error: (err) => {
                console.error('Erreur lors de la suppression de la ville', err);
                this.showErrorMessage = true;
              },
              complete: () => (this.getManagers())
            })
          }
        }
      })
    }

  }
}
