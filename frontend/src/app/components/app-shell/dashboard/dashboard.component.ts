import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { SearchLogicService } from 'src/app/services/search-logic.service';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  emailsSent: number | null = null;
  teamSize: number | null = null;

  quickLinks = [
    { path: '/app/campaigns', icon: 'send', title: 'New campaign', body: 'Compose and send a personalized campaign.' },
    { path: '/app/contacts', icon: 'groups', title: 'Manage contacts', body: 'Import and segment your contact list.' },
    { path: '/app/analytics', icon: 'insights', title: 'View analytics', body: 'See delivery, opens, and clicks by campaign.' },
    { path: '/app/settings', icon: 'settings', title: 'Team & settings', body: 'Manage your organization and team roles.' },
  ];

  constructor(
    public authService: AuthService,
    private searchLogicService: SearchLogicService,
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
    this.searchLogicService
      .getReport({ page: 0, size: 1 })
      .pipe(catchError(() => of(null)))
      .subscribe((result) => {
        this.emailsSent = result?.totalItems ?? 0;
      });

    this.usersService
      .listOrganizationMembers()
      .pipe(catchError(() => of([])))
      .subscribe((members) => {
        this.teamSize = members.length;
      });
  }
}
