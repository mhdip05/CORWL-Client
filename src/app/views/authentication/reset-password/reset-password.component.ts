import { AccountSettingsService } from './../../../_services/account-settings/account-settings.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  model: any = {}
  showPasswordResetForm: boolean = true;

  constructor(private router: Router, 
              private accountSettingsService: AccountSettingsService,
              private toastr:ToastrService) { }

  ngOnInit(): void {
    var getEmail = sessionStorage.getItem('forgot_password_email')
    if (getEmail == null) 
      this.router.navigateByUrl('/')
    else
      this.model.Email = getEmail;
  }

  resetPassword() {
    //console.log(this.model)
    this.accountSettingsService.ResetPassowrd(this.model).subscribe({
      next: (r) => {
        //console.log(r)
        if(r.message === "MAIL_NOT_FOUND"){
           alert("Something critical happened while resetting password, please send code again")
           this.router.navigateByUrl('/forgot-password')
           return;
        }

        this.toastr.success(r.message)
        this.model = {}
        this.showPasswordResetForm = false;
      }
    })
  }

}
