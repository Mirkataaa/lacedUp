import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DOMAINS } from '../../constants';
import { emailValidator } from '../../utils/email.validator';
import { matchPasswordsValidator } from '../../utils/match-passwords.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink , ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  form = new FormGroup({
    email: new FormControl('' , [
      Validators.required,
      Validators.minLength(10),
      emailValidator(DOMAINS),
    ]),
    username: new FormControl('' , [
      Validators.required, 
      Validators.minLength(2),
    ]),
    passGroup: new FormGroup(
      {
        password: new FormControl('' , [
          Validators.required,
          Validators.minLength(4)
        ]),
        rePassword: new FormControl('' , [Validators.required]),
      },
      {
        validators: [matchPasswordsValidator('password' , 'rePassword')],
      }
    ),
  });

  constructor(private userService: UserService, private router: Router) {}

  isFieldMissing(controlName: string) {
    return (
      this.form.get(controlName)?.touched && this.form.get(controlName)?.errors?.['required']
    )
  }

  get isNotMinLength() {
    return (
      this.form.get('username')?.touched && this.form.get('username')?.errors?.['minlength']
    )
  }

  get isEmailNotValid() {
    return (
      this.form.get('email')?.touched && this.form.get('email')?.errors?.['emailValidator']
    )
  }

  get passGroup () {
    return this.form.get('passGroup');
  }

  register(){
    if(this.form.invalid){
      return
    }

    const {
      email,
      username,
      passGroup: {password , rePassword} = {},
    } = this.form.value;

      console.log({email, username , password , rePassword});
      
    // TODO: Fix types
    this.userService
    .register(username!, email! , password! , rePassword!)
    .subscribe(() => {
      this.router.navigate(['/home'])
    })
  }
}
