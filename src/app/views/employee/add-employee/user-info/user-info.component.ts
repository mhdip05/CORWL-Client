import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { CustomModel } from 'src/app/_models/CustomModel';
import { DesignModel } from 'src/app/_models/DesignModel';
import { EmployeeService } from 'src/app/_services/employee/employee.service';
import { UtilsService } from 'src/app/_services/utils/utils.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  customModel = new CustomModel();
  designModel = new DesignModel();
  isUpdate = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private utilService: UtilsService,
    private messageService: MessageService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['id'] !== undefined) {
      this.customModel.model = {
        ...this.customModel.model,
        ...{ employeeId: this.activatedRoute.snapshot.params['id'] },
      };
    }
  }

  getUserData() {
    this.employeeService
      .getUserData(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: (v: any) => {
          if (v) {
            //console.log(v);
            this.customModel.model = v;
            this.isUpdate = true;
          }
        },
      });
  }

  addUserInfo() {
    this.customModel.disabled = true;
    this.employeeService
      .saveUserData(this.customModel.model)
      .pipe(
        finalize(() => {
          this.customModel.disabled = false;
        })
      )
      .subscribe({
        next: (v: any) => {
          if (v.status == true) {
            this.messageService.add(
              this.utilService.successMessage(v.message, 3000)
            );
            this.customModel.model.password = null;
            this.customModel.model.confirmPassword = null;
          }
        },
        error: (e) => {
          this.displayError(e);
        },
      });
  }

  updateUserInfo() {
    //console.log(this.customModel.model);
    this.customModel.disabled = true;
    this.employeeService
      .updateUserInfo(this.customModel.model)
      .pipe(
        finalize(() => {
          this.customModel.disabled = false;
        })
      )
      .subscribe({
        next: (v: any) => {
          this.messageService.add(
            this.utilService.successMessage(v.message, 3000)
          );
        },
        error: (e) => {
          //console.log(e)
          this.displayError(e);
        },
      });
  }

  updatePassword() {
    var passwordModel = {
      id: this.customModel.model.id,
      password: this.customModel.model.password,
      confirmPassword: this.customModel.model.confirmPassword,
    };
    console.log(passwordModel)
    this.customModel.disabled = true;
    this.employeeService
      .updateUserPassword(passwordModel)
      .pipe(
        finalize(() => {
          this.customModel.disabled = false;
        })
      )
      .subscribe({
        next: (v: any) => {
          this.messageService.add(
            this.utilService.successMessage(v.message, 3000)
          );
          this.hidePasswordModal()
        },
        error: (e) => {
          //console.log(e);
          this.displayError(e);
        },
      });
  }

  hidePasswordModal(){
    this.customModel.validationReset();
    this.customModel.model.password = null;
    this.customModel.model.confirmPassword = null;
    this.customModel.displayModal = false;
  }

  displayError(e: any) {
    const error: any = this.customModel.handleError(e);
    //console.log(error)
    if (error.isDbError) {
      this.messageService.add(
        this.utilService.dangerMessage(error.dbError, 4000)
      );
    }
  }
}
