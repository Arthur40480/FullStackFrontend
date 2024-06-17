import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsComponent } from './hotels/components/components.component';
import { HotelsComponent } from './components/hotels/hotels.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    HotelsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
