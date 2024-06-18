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
  ) {

  }
  navigateToCitiesList() {
    this.router.navigateByUrl('cities');
  }
}
