import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {
  BehaviorSubject,
  map,
  Observable,
  of,
  switchMap,
  debounceTime,
  distinctUntilChanged, EMPTY, take, toArray, mergeMap, from, groupBy, Subscription
} from "rxjs";
import {Country, Payment, User} from "../models/models";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../services/data-service/data.service";

type DataModel = User | Payment | Country | StatusWithCount;
interface StatusWithCount {
  status: string;
  count: number;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnDestroy, OnChanges{
  @Input() data: Observable<DataModel[]> | undefined;
  filteredData$: Observable<DataModel[]> = EMPTY;
  isFullList: boolean = false;
  selectedValue: string | undefined;
  private dataType: 'users' | 'payments' | 'countries' = 'users';

  private searchTerm$ = new BehaviorSubject<string>('');
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {
    this.route.url.subscribe(segments => {
      if (segments.length > 0) {
        this.dataType = segments[0].path as 'users' | 'payments' | 'countries';
        this.isFullList = true;
        this.loadData();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.loadData();
    }
  }

  loadData() {
    if (!this.data) {
      this.data = this.getDataFromService();
    }

    this.filteredData$ = this.searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchTerm) => this.filterData(searchTerm)),
      switchMap((data) => this.groupByStatus(data)) // Group data by status
    );
    const filteredDataSubscription = this.filteredData$.subscribe(() => {});
    this.subscriptions.push(filteredDataSubscription);
  }

  getDataFromService(): Observable<DataModel[]> {
    switch (this.dataType) {
      case 'users':
        return this.dataService.getUsersData();
      case 'payments':
        return this.dataService.getPaymentsData();
      case 'countries':
        return this.dataService.getCountriesData();
      default:
        return EMPTY;
    }
  }

  private filterData(searchTerm: string): Observable<DataModel[]> {
    if (!this.data) {
      return of([]);
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return this.data.pipe(
      map((data) =>
        data.filter((item) => {
          if (this.isUser(item)) {
            return (
              item.firstName.toLowerCase().includes(lowerCaseSearchTerm) ||
              item.lastName.toLowerCase().includes(lowerCaseSearchTerm) ||
              item.email.toLowerCase().includes(lowerCaseSearchTerm)
            );
          } else if (this.isPayment(item)) {
            return (
              item.status.toLowerCase().includes(lowerCaseSearchTerm) ||
              item.receiver.toLowerCase().includes(lowerCaseSearchTerm)
            );
          } else if (this.isCountry(item)) {
            return (
              item.name.toLowerCase().includes(lowerCaseSearchTerm) ||
              item.code.toLowerCase().includes(lowerCaseSearchTerm)
            );
          }
          return false;
        })
      ),
      take(100)
    );
  }


  isUser(item: DataModel): item is User {
    return 'avatarUrl' in item;
  }

  isPayment(item: DataModel): item is Payment {
    return 'status' in item;
  }

  isCountry(item: DataModel): item is Country {
    return 'flag' in item;
  }

  setSearchTerm(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement)?.value || '';
    this.searchTerm$.next(searchTerm);
  }

  trackByFn(index: number, item: DataModel | StatusWithCount): string {
    if ('flag' in item) {
      return (item as unknown as Payment).id.toString(); // For individual Payment items, use the 'id' property as the unique identifier
    } else if ('flag' in item) {
      return (item as Country).id.toString(); // For individual Country items, use the 'id' property as the unique identifier
    } else {
      // For other types (users and StatusWithCount), we don't have a unique identifier, so we use the index.
      return index.toString();
    }
  }
  openUserDetails(user: User) {
    this.router.navigate(['/users', user.id]);
  }
  openCountryDetails(country: Country) {
    this.router.navigate(['/countries', country.id]);
  }
  goToList() {
    this.filteredData$ = this.filterData(this.searchTerm$.value);
    this.filteredData$.pipe(take(1)).subscribe((data) => {
      let url: string;
      const firstItem = data[0];

      if (this.isUser(firstItem)) {
        url = '/users';
      } else if (this.isPayment(firstItem)) {
        url = '/';
      } else if (this.isCountry(firstItem)) {
        url = '/countries';
      } else {
        url = '/';
      }
      this.router.navigate([url]);
    });
  }
  private groupByStatus(data: DataModel[]): Observable<DataModel[]> {
    if (data.length > 0) {
      if (this.isPayment(data[0]) || this.dataType == 'payments') {
        return this.groupPaymentsByStatus(data);
      } else {
        return of(data);
      }
    }
    else {
      return of(data);
    }
  }

  private groupPaymentsByStatus(data: DataModel[]): Observable<StatusWithCount[]> {
    return from(data).pipe(
      groupBy((item) => (item as Payment).status), // Group by the 'status' property for payments
      mergeMap((group) => group.pipe(toArray())),
      mergeMap((groupedData) => {
        const status = (groupedData[0] as Payment).status;
        const count = groupedData.length;
        return of({ status, count });
      }),
      toArray()
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}



