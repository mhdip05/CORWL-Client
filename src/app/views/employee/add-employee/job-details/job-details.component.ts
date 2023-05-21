import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { CustomModel } from 'src/app/_models/CustomModel';
import { DesignModel } from 'src/app/_models/DesignModel';
import { EmployeeModel } from 'src/app/_models/EmployeeModel';
import { DateTimeService } from 'src/app/_services/date-time/date-time.service';
import { EmployeeService } from 'src/app/_services/employee/employee.service';
import { UtilsService } from 'src/app/_services/utils/utils.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',

  styleUrls: ['./job-details.component.scss'],
})
export class JobDetailsComponent implements OnInit {
  customModel = new CustomModel();
  designModel = new DesignModel();
  employeeModel = new EmployeeModel();
  isUpdate = false;

  constructor(
    public dateTimeService: DateTimeService,
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private utilService: UtilsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params['id'] !== undefined){
      this.customModel.editMode = true;
      this.customModel.model = {
        ...this.customModel.model,
        ...{ employeeId: this.activatedRoute.snapshot.params['id'] },
      };
      this.getEmployeeJobDetails();
    }

  }

  getEmployeeJobDetails() {
    this.employeeService
      .getEmployeeJobDetails(this.customModel.model.employeeId)
      .subscribe({
        next: (v: any) => {
          //console.log(v)
          if (v !== null) {
            this.customModel.viewData(v);
            this.customModel.model = v;
            this.isUpdate = true;
          }
        },
      });
  }

  addJobDetails() {
    this.customModel.disabled = true;
    this.employeeService
      .saveEmployeeJobDetails(this.customModel.model)
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
          //console.log(e);
          this.displayError(e);
        },
      });
  }

  updateJobDetails() {
    //console.log(this.customModel.model);
    this.customModel.disabled = true;
    this.employeeService
      .updateEmployeeJobDetails(this.customModel.model)
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
          this.displayError(e);
        },
      });
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
