import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FaConfig, FaIconLibrary , FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fontAwesomeIcons } from './shared/font-awesome-icons';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './core/footer/footer.component';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  constructor(private userService: UserService , private rotuer:Router) {}

  private faIconLibrary = inject(FaIconLibrary);
  private faConfig = inject(FaConfig);


  ngOnInit(): void {
    this.initFontAwesome();
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.userService.setUser(user);
        if(this.rotuer.url === '/login'){
          this.rotuer.navigate(['/home'])
        }else if (this.rotuer.url === '/register'){
          this.rotuer.navigate(['/home'])
        }
      },
      error: (error) => {
        console.log('User not found:' , error);
        
      }
    })
  }
  

  private initFontAwesome() {
    this.faConfig.defaultPrefix = 'far'
    this.faIconLibrary.addIcons(...fontAwesomeIcons)
  }
}
