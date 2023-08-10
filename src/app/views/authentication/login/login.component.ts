import { finalize, Observable } from 'rxjs';
import { IErrorModal } from './../../../_interface/IErrorModal';
import { AuthService } from './../../../_services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/_interface/IUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  disabled = false;
  model: any = {};
  currentUser$?: Observable<IUser>;

  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit(): void {
    sessionStorage.removeItem('forgot_password_email');
    
    if (this.authService.authUserdata != null)
      this.router.navigateByUrl('/dashboard');  
  }

  login() {
    this.disabled = true;
    this.authService
      .login(this.model)
      .pipe(
        finalize(() => {
          this.disabled = false;
        })
      )
      .subscribe({
        next: (v) => {
          this.router.navigateByUrl('/choose-role');
        },
      });
  }
  
}
