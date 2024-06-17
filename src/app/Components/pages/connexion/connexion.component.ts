import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AuthService } from 'src/app/Services/Auth/auth.service';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
})
export class ConnexionComponent {

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _notifierService: NotifierService
  ) { }

  // user variables
  email: string = "";
  password: string = "";

  // matcher
  matcher: ErrorStateMatcher = new ErrorStateMatcher();

  // form control
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  // toggle visibility icon on password variable
  showPassword = true;

  /**
   * Toggle visibility password
   */
  toggle_visibility_password() {

    this.showPassword = !this.showPassword;
  }

  connexion() {
    if (this.emailFormControl.valid && this.passwordFormControl.valid) {
      this._authService.login(this.email, this.password).subscribe(response => {

        if (response.success != undefined) {
          this._authService.user = response.success.data;

          // save user in session
          sessionStorage.setItem('user', JSON.stringify(this._authService.user + ''));

          // navigate to user page
          this._router.navigate(['/user/home/']);
        } else {
          this._notifierService.notify('error', 'Email ou mot de passe incorrect');
        }

      });
    } else {
      this._notifierService.notify('error', 'Formulaire invalide');
    }

  }

}
