import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelsComponent } from './components/hotels/hotels.component';
import { HotelDetailComponent } from './components/hotel-detail/hotel-detail.component';

const routes: Routes = [
  { path: 'hotels', component : HotelsComponent},
  { path: 'hotelDetail/:id', component : HotelDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
