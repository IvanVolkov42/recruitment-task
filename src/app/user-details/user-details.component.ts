import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/models';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
    ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.http
        .get<User>(`http://localhost:3000/users/${userId}`)
        .subscribe((user) => (this.user = user));
    }
  }
  goBack() {
    this.router.navigate(['/users']);
  }
}
