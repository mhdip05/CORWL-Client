import { finalize, Observable } from 'rxjs';
import { IErrorModal } from './../../../_interface/IErrorModal';
import { AuthService } from './../../../_services/auth/auth.service';
import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/_interface/IUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {

  disabled: boolean = false;
  model: any = {};
  currentUser$?: Observable<IUser>

  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.authUserdata != null)
      this.router.navigateByUrl('/dashboard')

    sessionStorage.removeItem('forgot_password_email')
  }

  login() {
    this.disabled = true;
    this.authService.login(this.model)
      .pipe(finalize(() => {
        this.disabled = false;
      }))
      .subscribe({
        next: (v) => {
          this.router.navigateByUrl('/dashboard')
        },
      })
  }
}
