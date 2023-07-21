import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Country} from '../models/models';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css'],
})
export class CountryDetailsComponent implements OnInit {
  country: Country | undefined;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router) {}

  ngOnInit(): void {
    const countryId = this.route.snapshot.paramMap.get('id');
    if (countryId) {
      this.http
        .get<Country>(`http://localhost:3000/countries/${countryId}`)
        .subscribe((country) => (this.country = country));
    }
  }
  goBack() {
    this.router.navigate(['/countries']);
  }
}
