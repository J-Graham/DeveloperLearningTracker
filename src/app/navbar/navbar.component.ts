import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  styleUrls: ['./navbar.component.css'],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  navbarOpen = false;
  constructor() {}

  toggleNavbar(): void {
    this.navbarOpen = !this.navbarOpen;
  }
}
