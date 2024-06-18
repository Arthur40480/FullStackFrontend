import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { CardsComponent } from './components/cards/cards.component';
import { HotelDetailComponent } from './components/hotel-detail/hotel-detail.component';
import { CityListComponent } from './components/city-list/city-list.component';
import { CityFormComponent } from './components/city-form/city-form.component';
import { HotelListComponent } from './components/hotel-list/hotel-list.component';
import { HotelFormComponent } from './components/hotel-form/hotel-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HotelsComponent,
    CardsComponent,
    HotelDetailComponent,
    CityListComponent,
    CityFormComponent,
    HotelListComponent,
    HotelFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
