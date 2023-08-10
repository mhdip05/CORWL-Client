import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AccountSettingsService } from 'src/app/_services/account-settings/account-settings.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss'],
})
export class ChangeEmailComponent implements OnInit {
  model: any = {};
  disabled = false;
  constructor(
    private toastr: ToastrService,
    private accService: AccountSettingsService
  ) {}

  ngOnInit(): void {}

  changeEmail() {
    this.disabled = true;
    this.accService
      .changeEmail(this.model)
      .pipe(
        finalize(() => {
          this.disabled = false;
        })
      )
      .subscribe((res: any) => {
        this.toastr.success(res.message);
        this.model = {};
      });
  }
}


