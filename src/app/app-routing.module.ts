import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelsComponent } from './components/hotels/hotels.component';
import { HotelDetailComponent } from './components/hotel-detail/hotel-detail.component';
import { CityListComponent } from './components/city-list/city-list.component';
import { CityFormComponent } from './components/city-form/city-form.component';

const routes: Routes = [
  { path: 'hotels', component : HotelsComponent},
  { path: 'hotelDetail/:id', component : HotelDetailComponent},
  { path: 'cities', component: CityListComponent},
  { path: 'cityForm/:id', component: CityFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
