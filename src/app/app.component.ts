import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from './services/authenticate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FullStackFrontend';
  userConected: boolean;
  isAdmin: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthenticateService
  ) {
    this.userConected = false;
    this.isAdmin = false;
  }

  ngOnInit():void {
    this.userConected = this.authService.isConnectedToken();
    console.log(this.userConected);
    this.isAdmin = this.authService.isAdminToken();
  }

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

    /**
   * Navigue vers le formulaire de connexion/déconnexion.
   */
  navigateToLoginForm() {
    this.router.navigateByUrl('login');
  }

    /**
   * Navigue vers la liste des managers.
   */
    navigateToManagerList() {
      this.router.navigateByUrl('managerList');
    }
}
