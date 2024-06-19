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
}
