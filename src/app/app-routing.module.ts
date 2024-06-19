import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelsComponent } from './components/hotels/hotels.component';
import { HotelDetailComponent } from './components/hotel-detail/hotel-detail.component';
import { CityListComponent } from './components/city-list/city-list.component';
import { CityFormComponent } from './components/city-form/city-form.component';
import { HotelListComponent } from './components/hotel-list/hotel-list.component';
import { HotelFormComponent } from './components/hotel-form/hotel-form.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { AdminGuard } from './guards/admin.guard';
import { ManagerListComponent } from './components/manager-list/manager-list.component';
import { ManagerFormComponent } from './components/manager-form/manager-form.component';

const routes: Routes = [
  { path: 'hotels', component : HotelsComponent},
  { path: 'hotelDetail/:id', component : HotelDetailComponent},
  { path: 'cities', component: CityListComponent,
  canActivate : [AdminGuard]
  },
  { path: 'cityForm/:id', component: CityFormComponent,
    canActivate : [AdminGuard]
  },
  { path: 'hotelList', component: HotelListComponent,
    canActivate : [AdminGuard]
  },
  { path: 'hotelForm/:id', component: HotelFormComponent,
    canActivate : [AdminGuard]
  },
  { path: "managerList", component: ManagerListComponent,
    canActivate : [AdminGuard]
  },
  { path: 'managerForm/:id', component: ManagerFormComponent,
    canActivate : [AdminGuard]
  },
  { path: 'login', component: LoginComponent},
  { path: '403', component: ForbiddenComponent},
  { path: '404', component: NotFoundComponent},
  { path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
