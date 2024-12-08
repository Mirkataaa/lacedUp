import { Component } from '@angular/core';
import {FormsModule , NgForm} from '@angular/forms'
import { DOMAINS } from '../../constants';
import { UserService } from '../user.service';
import { Router, RouterLink } from '@angular/router';
import { EmailDirective } from '../../shared/directives/email.directive';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink , FormsModule , EmailDirective , NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  domains = DOMAINS

  constructor(private userService: UserService, private router: Router) {}

  login(form: NgForm){
    if(form.invalid){
      console.error("Invalid Login Form!");
      return;
    }

    const {email , password} = form.value;
    console.log({email , password});
    this.userService.login(email , password).subscribe(() => {
      this.router.navigate(['/home']);
    })
    
  }
}
