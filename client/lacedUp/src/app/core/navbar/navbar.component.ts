import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule , RouterLink , FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  userName:string = 'Bonnie Green';
  userEmail:string = 'bonnie.green@example.com';
  activeMenu: string | null = null;

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
