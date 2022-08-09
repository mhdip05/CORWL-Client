import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  model: any = {}
  constructor(private authService: AuthService, private toastr:ToastrService) { }

  ngOnInit(): void {
    
  }

  changePassword() {
    this.authService.changePassword(this.model).subscribe({
      next: (r:any) => {
        this.toastr.success(r.message)
        this.model = {}
      }
    })
  }

}
