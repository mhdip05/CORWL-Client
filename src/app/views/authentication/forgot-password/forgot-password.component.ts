import { AccountSettingsService } from './../../../_services/account-settings/account-settings.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  disabled = false;
  model: any = {}

  constructor(private router: Router,
    private authService: AuthService,
    private accountSettingsService: AccountSettingsService) { }

  ngOnInit(): void {
    if (this.authService.authUserdata != null)
      this.router.navigateByUrl('/dashboard')

    sessionStorage.removeItem('forgot_password_email')
  }

  forgotPassword() {
    //console.log(this.model)
    //return;
    this.disabled = true;
    this.accountSettingsService.sendCodeToEmail(this.model)
      .pipe(finalize(() => {
        this.disabled = false;
      }))
      .subscribe({
        next: (r) => {
          //console.log(r)
          var email = r.value;
          sessionStorage.setItem('forgot_password_email', email);
          this.router.navigateByUrl('/reset-password')
        }
      })
  }
}
