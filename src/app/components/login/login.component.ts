import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  user: User;
  error: string | undefined;
  connected: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public authService: AuthenticateService,
    private apiService: ApiService,
  ) {
    this.connected = authService.isConnectedToken();
    this.user = authService.getUser();
    this.myForm = this.formBuilder.group({
      email: [ this.user?.email, [Validators.required, Validators.pattern(environment.regExEmail)]],
      password: [this.user?.password, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.user = new User('', '', []);
  }

  /**
   * Méthode pour gérer la connexion d'un utilisateur.
   * @param myForm Formulaire contenant les informations d'identification de l'utilisateur.
   */
  onLogin(myForm: FormGroup) {
    this.apiService.getToken(myForm.value.email, myForm.value.password).subscribe({
      next: (response) => {
        const token = response.headers.get('Authorization');
        if (token) {
          this.authService.setToken(token); // Enregistrer le token dans le service d'authentification
          this.connected = true; // Mettre à jour l'état de connexion dans ce composant
          this.router.navigateByUrl('hotels'); // Naviguer vers la page des hôtels après connexion
        } else {
          console.error('Token non trouvé dans les en-têtes de la réponse.');
        }
      },
      error: (err) => {
        this.error = 'Email ou mot de passe incorrect';
      },
    });
  }

  /**
   * Méthode pour déconnecter l'utilisateur.
   */
  disconnect() {
    this.authService.disconnectedToken(); // Effacer le token dans le service d'authentification
    this.connected = false; // Mettre à jour l'état de connexion dans ce composant
    this.router.navigateByUrl('hotels'); // Naviguer vers la page des formations après déconnexion
  }
}