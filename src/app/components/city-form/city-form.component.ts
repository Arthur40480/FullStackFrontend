import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City } from 'src/app/models/city.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.css']
})
export class CityFormComponent implements OnInit {

  city: City;
  myForm: FormGroup;
  error: string | null = null;
  status: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) { 
    this.city = new City(0, '');
    this.myForm = this.formBuilder.group({
      id: [this.city.id, Validators.required],
      name: [this.city.name, [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s-]+$/)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id && id > 0) {
      this.status = true;
      this.apiService.getCityById(id).subscribe({
        next: (data) => {
          this.city = data;
          this.myForm.setValue({
            id: this.city.id,
            name: this.city.name
          });
        },
        error: (err) => this.error = err.message,
        complete: () => this.error = null
      });
    }
  }

  onSubmit() {
    if (this.myForm.valid) {
      const cityData: City = this.myForm.value;
      this.apiService.saveCity(cityData).subscribe({
        next: (data) => (console.log(data)),
        error: (err) => (this.error = err.message),
        complete: () => (this.router.navigateByUrl('cities'))
      })
    } else {
      console.log("Formulaire non valide");
    }
  }
}