import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaConfig, FaIconLibrary , FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fontAwesomeIcons } from './shared/font-awesome-icons';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './core/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  private faIconLibrary = inject(FaIconLibrary);
  private faConfig = inject(FaConfig);


  ngOnInit(): void {
    this.initFontAwesome();  
  }

  private initFontAwesome() {
    this.faConfig.defaultPrefix = 'far'
    this.faIconLibrary.addIcons(...fontAwesomeIcons)
  }
}
