import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FullStackFrontend';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  /**
 * Navigue vers la page d'accueil.
 */
  navigateToHome() {
    this.router.navigateByUrl('hotels');
  }
  
/**
 * Navigue vers la liste des villes.
 */
navigateToCitiesList() {
  this.router.navigateByUrl('cities');
}

/**
 * Navigue vers la liste des hôtels.
 */
navigateToHotelsList() {
  this.router.navigateByUrl('hotelList');
}
}
