import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Hotel } from 'src/app/models/hotel.model';
import { City } from 'src/app/models/city.model';

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.css']
})
export class HotelFormComponent implements OnInit {
  
  myForm: FormGroup;
  listCities: City[];
  hotel: Hotel;
  error = null;
  status: boolean = false;
  urlEnv: String = '';
  urlImage: string;
  selectedFile: File | null = null;
  selectedFileName: String = '';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    const defaultCity = new City(0, '');
    this.urlEnv = environment.host;
    this.listCities = [];
    this.hotel = new Hotel(0, '', '', '', '', 1, 0, 0, 0, '', defaultCity);
    this.myForm = this.formBuilder.group({
      id: [this.hotel.id],
      name: [this.hotel.name, [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s-]+$/)]],
      description: [this.hotel.description, [Validators.required, Validators.minLength(10), Validators.pattern(/^[a-zA-Z0-9\s.,'"\-!?:;À-ÿ]+$/)]],
      phoneNumber: [this.hotel.phoneNumber, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      adress: [this.hotel.adress, [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9\s.,'"\-!?:;À-ÿ]+$/)]],
      rating: [this.hotel.rating],
      roomAvailability: [this.hotel.roomAvailability],
      lowestRoomPrice: [this.hotel.lowestRoomPrice],
      img: [this.hotel.img],
      city: [this.hotel.id === 0 ? null : this.hotel.city, [Validators.required]]
    })
    this.urlImage = 'assets/img/default.jpg';
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.getAllCities();
    if(id > 0) {
      this.status = true;
      this.apiService.getHotelById(id).subscribe({
        next: (data) => {
          this.hotel = data;
          this.myForm.setValue({
            id: this.hotel.id,
            name: this.hotel.name,
            description: this.hotel.description,
            phoneNumber: this.hotel.phoneNumber,
            adress: this.hotel.adress,
            rating: this.hotel.rating,
            roomAvailability: this.hotel.roomAvailability,
            lowestRoomPrice: this.hotel.lowestRoomPrice,
            img: this.hotel.img,
            city: this.hotel.city
          })
          this.urlImage = this.getHotelImageUrl();
          this.apiService.getCities().subscribe({
            next: (data) => {
              this.listCities = data;
              this.filterCategories();
            },
            error: (err) => (this.error = err.message),
            complete: () => (this.error = null)
          });
        },
        error:(err) => (this.error = err.message),
      })
    }else {
      this.urlImage = 'assets/default.jpg';
    }
    this.route.params.subscribe((params) => {
      let id = +params['id'];
      console.log(id);
      if (id != 0) {
        console.log('id : ' + id + ' loadtraining');
        this.loadTraining(id);
      } else if (id == 0) {
        console.log('reset form');
        this.resetForm();
      }
    });
  }

    /**
   * Récupère toutes les villes en utilisant le service API et met à jour la liste des villes.
   */
  getAllCities(): void {
    this.apiService.getCities().subscribe({
      next: (data) => (this.listCities = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null)
    });
  }

  getHotelImageUrl(): string {
    return this.status
      ? `${this.urlEnv}/download/${this.hotel.id}?${new Date().getTime()}`
      : 'assets/default.jpg';
  }

  filterCategories(): void {
    if (this.hotel && this.hotel.city) {
      this.listCities = this.listCities.filter(
        (city) => city.id !== this.hotel.city.id
      );
    }
  }

  loadTraining(id: number) {
    this.apiService.getHotelById(id).subscribe((hotel) => {
      this.hotel = hotel;
      this.myForm.patchValue(this.hotel);
      this.refreshImageUrl();
    });
  }

  refreshImageUrl(): void {
    this.urlImage = this.getHotelImageUrl();
    this.cdr.detectChanges();
  }

  resetForm() {
    this.myForm.reset({
      id: 0,
      name: '',
      description: '',
      phoneNumber: '',
      adress: '',
      rating: 1,
      roomAvailability: 0,
      lowestRoomPrice: 0,
      img: 'assets/default.jpg',
      city: null
    });
    this.urlImage = 'assets/default.jpg';
    this.status = false;
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    this.selectedFile = event.target.files[0] as File;
    if (input.files) {
      this.selectedFileName = input.files[0].name;
    }
  }

  onSubmit(form: FormGroup) {
    this.onAddHotel(form);
  }

  onAddHotel(form: FormGroup) {
    if(form.valid) {
      const imgToUse = this.status ? this.hotel.img : 'default.jpg';
      if(this.selectedFile == null) {
        this.apiService.saveHotel({
          id: form.value.id,
          name: form.value.name,
          description: form.value.description,
          phoneNumber: form.value.phoneNumber,
          adress: form.value.adress,
          rating: form.value.rating,
          review: 0,
          roomAvailability: form.value.roomAvailability,
          lowestRoomPrice: form.value.lowestRoomPrice,
          img: imgToUse,
          city: form.value.city
        }).subscribe({
          next: (data) => (console.log(data)),
          error: (err) => (this.error = err.message),
          complete: () => this.router.navigateByUrl('hotelList'),
        });
      }else {
        const formData = new FormData();
        formData.append('file', this.selectedFile as File, this.selectedFile?.name);
        this.apiService.postImg(formData).subscribe({
          next: (data) => (console.log(data)),
          error: (err) => (this.error = err.message),
          complete: () => {
            this.apiService.saveHotel({
              id: form.value.id,
              name: form.value.name,
              description: form.value.description,
              phoneNumber: form.value.phoneNumber,
              adress: form.value.adress,
              rating: form.value.rating,
              review: 0,
              roomAvailability: form.value.roomAvailability,
              lowestRoomPrice: form.value.lowestRoomPrice,
              img: this.selectedFileName,
              city: form.value.city
            }).subscribe({
              next: (data) => (console.log(data)),
              error: (err) => (this.error = err.message),
              complete: () => (this.router.navigateByUrl('hotelList'))
            })
          }
        })
      }
    }
  }
}
