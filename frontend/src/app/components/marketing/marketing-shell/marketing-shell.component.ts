import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-marketing-shell',
  templateUrl: './marketing-shell.component.html',
  styleUrls: ['./marketing-shell.component.scss'],
})
export class MarketingShellComponent {
  menuOpen = false;
  currentYear = new Date().getFullYear();

  constructor(public authService: AuthService) {}

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
