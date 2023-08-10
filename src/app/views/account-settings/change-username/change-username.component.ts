import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AccountSettingsService } from 'src/app/_services/account-settings/account-settings.service';

@Component({
  selector: 'app-change-username',
  templateUrl: './change-username.component.html',
  styleUrls: ['./change-username.component.scss'],
})
export class ChangeUsernameComponent implements OnInit {
  model:any = {};
  disabled = false;
  constructor(private toastr:ToastrService,private accService: AccountSettingsService) {}

  ngOnInit(): void {}

  changeUsername() {
    this.disabled = true;
    this.accService
    
      .changeUsername(this.model)
      .pipe(
        finalize(() => {
          this.disabled = false;
        })
      )
      .subscribe((res: any) => {
        //console.log(res);
        this.toastr.success(res.message)
        //this.model = {}
      });
  }
}
