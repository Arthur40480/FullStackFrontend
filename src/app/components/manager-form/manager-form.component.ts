import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Manager } from 'src/app/models/manager.model';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel } from 'src/app/models/hotel.model';

@Component({
  selector: 'app-manager-form',
  templateUrl: './manager-form.component.html',
  styleUrls: ['./manager-form.component.css']
})
export class ManagerFormComponent implements OnInit {
 
  myForm: FormGroup;
  manager: Manager;
  listHotel: Hotel[];
  status: boolean = false;
  error = null;

  availableHotels: Hotel[] = [];
  assignedHotels: Hotel[] = [];
  idSelectedHotel: number | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.listHotel = [];
    this.manager = new Manager(0, '');
    this.myForm = this.formBuilder.group({
      id: [this.manager.id],
      username: [ this.manager.username]
    })
  }

  ngOnInit(): void {
    this.getAllHotel();
    let id = this.route.snapshot.params['id'];
    if(id > 0) {
      this.status = true;
      this.apiService.getManagerById(id).subscribe({
        next: (data) => {
          this.manager = data;
          this.myForm.setValue({
            id: this.manager.id,
            username: this.manager.username,
          })
          this.apiService.getHotelByManager(data.id).subscribe({
            next: (data) => {
              this.assignedHotels = data;
              this.filterAvailableHotels();
            }
          })
        },
        error: (err) => (this.error = err.message),
      })
    }
  }

  getAllHotel() {
    this.apiService.getAllHotel().subscribe({
      next: (data) => {
        this.availableHotels = data;
        this.filterAvailableHotels();

      },
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null)
    })
  }

  filterAvailableHotels() {
    this.availableHotels = this.availableHotels.filter(hotel => !this.isHotelAssigned(hotel));
  }

  isHotelAssigned(hotel: Hotel): boolean {
    return this.assignedHotels.some(assignedHotel => assignedHotel.id === hotel.id);
  }

  addHotelToManager() {
    if(this.idSelectedHotel !== undefined) {
      this.apiService.assignHotelToManager(this.manager.id, this.idSelectedHotel).subscribe({
        next: (hotel) => {
          console.log("Hotel ajouter : " , hotel);
          this.assignedHotels.push(hotel);
          this.filterAvailableHotels();
        }
      })
    }
  }

  removeHotelFromManager(idHotel: number) {
    this.apiService.removeHotelToManager(this.manager.id, idHotel).subscribe({
      next: (hotel) => {
        console.log("Hotel retirer :", hotel);
        this.assignedHotels = this.assignedHotels.filter(h => h.id !== idHotel);
        this.availableHotels.push(hotel);
      }
    })
  }

  addManager(form: FormGroup) {
    if(form.valid) {
      if(this.status) {
        this.apiService.saveManager({
          id: form.value.id,
          username: form.value.username,
          password: this.ma
        }).subscribe({
          next: (data) => (console.log(data)),
          error: (err) => (this.error = err.message),
          complete: () => this.router.navigateByUrl('managerList'),
        })
      }
    }
  }
}
