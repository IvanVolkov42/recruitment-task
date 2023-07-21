import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatInputModule} from "@angular/material/input";
import { UserDetailsComponent } from './user-details/user-details.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatTabsModule} from "@angular/material/tabs";
import {AppRoutingModule} from "./app-routing.module";
import { SpinnerComponent } from './spinner/spinner.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    UserDetailsComponent,
    CountryDetailsComponent,
    SpinnerComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    MatListModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    AppRoutingModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
