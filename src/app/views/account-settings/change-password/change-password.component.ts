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

  model: any = {}
  loading = false;
  inputClass = "form-control form-control-sm"
  constructor(private accountSettingsService: AccountSettingsService, private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  changePassword() {
    this.loading = true;
    this.accountSettingsService.changePassword(this.model)
      .pipe(finalize(() => {
        this.loading = false;
      }))
      .subscribe({
        next: (r: any) => {
          this.toastr.success(r.message)
          this.model = {}
        }
      })
  }

}
