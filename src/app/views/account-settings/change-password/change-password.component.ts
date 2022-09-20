import { AccountSettingsService } from './../../../_services/account-settings/account-settings.service';

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  disabled = false;
  model: any = {}
  constructor(private accountSettingsService: AccountSettingsService, private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  changePassword() {
    this.disabled = true;
    this.accountSettingsService.changePassword(this.model)
      .pipe(finalize(() => {
        this.disabled = false;
      }))
      .subscribe({
        next: (r: any) => {
          this.toastr.success(r.message)
          this.model = {}
        }
      })
  }

}
