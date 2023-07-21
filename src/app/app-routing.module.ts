import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import {MainComponent} from "./main/main.component";
import {ListComponent} from "./list/list.component";

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'users', component: ListComponent},
  { path: 'users/:id', component: UserDetailsComponent },
  { path: 'countries', component: ListComponent },
  { path: 'payments', component: ListComponent },
  { path: 'countries/:id', component: CountryDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
