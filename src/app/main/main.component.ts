import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {combineLatest, map, Observable, shareReplay, Subject, takeUntil} from 'rxjs';
import {Country, Payment, User} from "../models/models";
import {DataService} from "../services/data-service/data.service";

type DataModel = User | Payment | Country;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean> | undefined;
  usersData$: Observable<DataModel[]> | undefined;
  paymentsData$: Observable<DataModel[]> | undefined;
  countriesData$: Observable<DataModel[]> | undefined;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private http: HttpClient,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }
  private loadData(): void {
    this.dataService.loadUsersData();
    this.dataService.loadPaymentsData();
    this.dataService.loadCountriesData();

    this.usersData$ = this.dataService.getUsersData().pipe(takeUntil(this.unsubscribe$));
    this.paymentsData$ = this.dataService.getPaymentsData().pipe(takeUntil(this.unsubscribe$));
    this.countriesData$ = this.dataService.getCountriesData().pipe(takeUntil(this.unsubscribe$));
    this.loading$ = this.dataService.isLoading().pipe(takeUntil(this.unsubscribe$));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
