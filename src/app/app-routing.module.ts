import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelsComponent } from './components/hotels/hotels.component';
import { HotelDetailComponent } from './components/hotel-detail/hotel-detail.component';
import { CityListComponent } from './components/city-list/city-list.component';
import { CityFormComponent } from './components/city-form/city-form.component';
import { HotelListComponent } from './components/hotel-list/hotel-list.component';
import { HotelFormComponent } from './components/hotel-form/hotel-form.component';

const routes: Routes = [
  { path: 'hotels', component : HotelsComponent},
  { path: 'hotelDetail/:id', component : HotelDetailComponent},
  { path: 'cities', component: CityListComponent},
  { path: 'cityForm/:id', component: CityFormComponent},
  { path: 'hotelList', component: HotelListComponent},
  { path: 'hotelForm/:id', component: HotelFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
