import { Component, Input, OnInit } from '@angular/core';
import { CustomModel } from './../../../../_models/CustomModel';
import { EmployeeModel } from './../../../../_models/EmployeeModel';
import { DateTimeService } from 'src/app/_services/date-time/date-time.service';
import { EmployeeService } from 'src/app/_services/employee/employee.service';
import { MessageService } from 'primeng/api';
import { UtilsService } from 'src/app/_services/utils/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/_services/auth/auth.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
})
export class BasicInfoComponent implements OnInit {
  customModel = new CustomModel();
  employeeModel = new EmployeeModel();
  maxDate = this.dateTimeService.subTractYears(new Date(), 15);
  isDataSaved = false;
  employeeId = 0;

  constructor(
    private dateTimeService: DateTimeService,
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private utilService: UtilsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['id'] !== undefined) {
      this.isDataSaved = false;
      this.customModel.editMode = true;
      this.customModel.isAmend = true;
      this.getEmployeeBasicInfo();
    }
  }

  saveEmployeeBasicInfo() {
    //console.log(this.customModel.model);
    //return;
    this.customModel.disabled = true;
    this.employeeService
      .saveEmployeeBasicInfo(this.customModel.model)
      .pipe(
        finalize(() => {
          this.customModel.disabled = false;
        })
      )
      .subscribe({
        next: (v: any) => {
          //console.log(v);
          this.employeeId = v.data.id;
          this.messageService.add(
            this.utilService.successMessage(v.message, 3000)
          );
          this.isDataSaved = true;
        },
        error: (e) => {
          this.displayError(e);
        },
      });
  }

  getEmployeeBasicInfo() {
    this.employeeService
      .getEmployeeBasicInfo(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: (v: any) => {
          //console.log(v)      
          this.customModel.viewData(v);
          this.customModel.editModel = v;
        },
        error:(e) => {
          if(e.status == 400){
            this.router.navigateByUrl('/404')
          }
        }
      });
  }

  editEmployeeBasicInfo() {
    //console.log(this.customModel.model)
    this.customModel.disabled = true;
    this.employeeService.updateEmployeeBasicInfo(this.customModel.model)
    .pipe(
      finalize(() => {
        this.customModel.disabled = false;
      })
    )
    .subscribe({
      next:(v:any)=> {
        this.customModel.editModel = v.data;
        this.messageService.add(
          this.utilService.successMessage(v.message, 3000)
        );
      },
      error:(e)=> {
        this.displayError(e);
      }
    })
  }

  addMoreDetails() {
    this.router.navigateByUrl('employee/edit-employee/' + this.employeeId);
  }

  cancel() {
    this.isDataSaved = false;
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
