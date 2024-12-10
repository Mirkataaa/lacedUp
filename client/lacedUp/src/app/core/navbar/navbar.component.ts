import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  userName: string | null = null;
  userEmail: string | null = null;
  activeMenu: string | null = null;
  isLoggedIn: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      if (user) {
        this.userName = user.username;
        this.userEmail = user.email;
        this.isLoggedIn = true;
      } else {
        this.userName = null;
        this.userEmail = null;
        this.isLoggedIn = false;
      }
    });
  }

  toggleDropdown(menu: string, event: MouseEvent): void {
    event.stopPropagation();
    this.activeMenu = this.activeMenu === menu ? null : menu;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.dropdown');
    if (!clickedInside) {
      this.activeMenu = null;
    }
  }

  logout(): void {
    this.activeMenu = null;
    this.isLoggedIn = false;
    this.userService.logout().subscribe({
      next: () => {
        console.log('Successfully logged out');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout error:', error);
      },
      complete: () => {
        console.log('Logout completed');
      },
    });
  }

  closeDropdown(): void {
    this.activeMenu = null;
  }

  closeDropDownMenu() {
    const bodyElement = document.activeElement as HTMLBodyElement;
    if (bodyElement) {
      bodyElement.blur();
    }
  }
}