import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ROLE_LABELS } from 'src/app/models/user';

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
})
export class AppShellComponent {
  roleLabels = ROLE_LABELS;
  navLinks = [
    { path: '/app/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/app/contacts', label: 'Contacts', icon: 'groups' },
    { path: '/app/campaigns', label: 'Campaigns', icon: 'send' },
    { path: '/app/analytics', label: 'Analytics', icon: 'insights' },
    { path: '/app/settings', label: 'Settings', icon: 'settings' },
  ];

  constructor(public authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout().subscribe(() => this.router.navigateByUrl('/'));
  }
}
