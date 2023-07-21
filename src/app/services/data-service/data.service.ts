import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Country, Payment, User } from '../../models/models';

type DataModel = User | Payment | Country;

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private usersData$ = new BehaviorSubject<User[]>([]);
  private paymentsData$ = new BehaviorSubject<Payment[]>([]);
  private countriesData$ = new BehaviorSubject<Country[]>([]);
  private loading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  loadUsersData() {
    this.loading$.next(true);
    this.http.get<User[]>('http://localhost:3000/users').subscribe(
      (users) => {
        this.usersData$.next(users);
        this.loading$.next(false);
      },
      (error) => {
        console.error('Error loading users data:', error);
        this.loading$.next(false);
      }
    );
  }

  loadPaymentsData() {
    this.loading$.next(true);
    this.http.get<Payment[]>('http://localhost:3000/payments').subscribe(
      (payments) => {
        this.paymentsData$.next(payments);
        this.loading$.next(false);
      },
      (error) => {
        console.error('Error loading payments data:', error);
        this.loading$.next(false);
      }
    );
  }

  loadCountriesData() {
    this.loading$.next(true);
    this.http.get<Country[]>('http://localhost:3000/countries').subscribe(
      (countries) => {
        this.countriesData$.next(countries);
        this.loading$.next(false);
      },
      (error) => {
        console.error('Error loading countries data:', error);
        this.loading$.next(false);
      }
    );
  }

  getUsersData(): Observable<User[]> {
    return this.usersData$.asObservable();
  }

  getPaymentsData(): Observable<Payment[]> {
    return this.paymentsData$.asObservable();
  }

  getCountriesData(): Observable<Country[]> {
    return this.countriesData$.asObservable();
  }

  isLoading(): Observable<boolean> {
    return this.loading$.asObservable();
  }

}
