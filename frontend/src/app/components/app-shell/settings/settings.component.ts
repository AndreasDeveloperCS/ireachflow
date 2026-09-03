import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { ROLE_LABELS, User, UserRole } from 'src/app/models/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  roleLabels = ROLE_LABELS;
  members: User[] = [];
  loadingMembers = true;

  constructor(public authService: AuthService, private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService
      .listOrganizationMembers()
      .pipe(catchError(() => of([])))
      .subscribe((members) => {
        this.members = members;
        this.loadingMembers = false;
      });
  }

  canManageTeam(): boolean {
    return this.authService.hasRole(UserRole.Owner, UserRole.Admin);
  }
}
