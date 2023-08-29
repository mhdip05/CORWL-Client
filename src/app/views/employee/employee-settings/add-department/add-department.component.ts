import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { GridModel } from 'src/app/_models/GridModel';
import { DepartmentService } from 'src/app/_services/department/department.service';
import { UtilsService } from 'src/app/_services/utils/utils.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss'],
})
export class AddDepartmentComponent implements OnInit {
  customModel = new GridModel();
  @Input() showGrid = false;

  constructor(
    private departmentService: DepartmentService,
    private messageService: MessageService,
    private utilService: UtilsService
  ) {}

  ngOnInit(): void {
    this.getAllDepartment();
    this.departmentListColumn();
  }

  private departmentListColumn() {
    this.customModel.cols = [
      {
        field: 'departmentName',
        header: 'Dept',
        style: { 'text-transform': 'capitalize' },
      },
      {
        field: 'abbreviation',
        header: 'Abbreviation',
        style: { 'text-transform': 'capitalize' },
      },
      {
        field: 'departmentHeadName',
        header: 'Dept. Head',
        style: { 'text-transform': 'capitalize' },
      },
      {
        field: 'createdDate',
        header: 'Created Date',
        type: 'date',
        format: 'dd/MM/yyyy',
        style: { 'margin-left': '5px' },
      },
      {
        field: 'lastUpdatedDate',
        header: 'Updated Date',
        type: 'date',
        format: 'dd/MM/yyyy',
        style: { 'margin-left': '5px' },
      },
      {
        field: 'createdByName',
        header: 'Created By',
        style: { 'text-transform': 'capitalize' },
      },
    ];
  }

  getAllDepartment() {
    return this.departmentService.getAllDepartment().subscribe({
      next: (res: any) => {
        //console.log(res)
        this.customModel.data = res;
      },
      complete: () => {
        this.customModel.gridLoad = false;
        this.utilService.turnLoadingBarOn = true;
      },
    });
  }

  changeDropdown(data: any) {
    this.customModel.model.departmentHeadId = data.employeeId;
    this.customModel.model.departmentHeadName = data.employeeName;
  }

  addDepartment() {
    //console.log(this.model);
    //return;
    this.customModel.disabled = true;
    this.departmentService
      .addDepartment(this.customModel.model)
      .pipe(
        finalize(() => {
          this.customModel.disabled = false;
        })
      )
      .subscribe({
        next: (v: any) => {
          this.messageService.add(
            this.utilService.successMessage(v.message, 2000)
          );
          this.reset();
        },
        complete: () => {
          this.refreshGrid();
        },
      });
  }

  updateDepartment() {
    //console.log(this.customModel.model);
    this.customModel.disabled = true;
    this.departmentService
      .updateDepartment(this.customModel.model)
      .pipe(
        finalize(() => {
          this.customModel.disabled = false;
        })
      )
      .subscribe({
        next: (v: any) => {
          //console.log(v);
          this.messageService.add(
            this.utilService.successMessage(v.message, 2000)
          );
        },
      });
  }

  viewData(data: any, eventType: string) {
    //console.log(data)
    this.customModel.editMode = false;
    this.customModel.model = { ...data };

    setTimeout(() => {
      this.customModel.editMode = true;
    }, 0);

    if (eventType == 'view') {
      this.customModel.isRemoved = true;
    } else {
      this.customModel.isRemoved = false;
    }
  }

  refreshGrid() {
    this.utilService.turnLoadingBarOn = false;
    this.customModel.gridLoad = true;
    this.getAllDepartment();
  }

  pullData() {
    this.getAllDepartment();
  }

  reset() {
    this.customModel.model = {};
    this.customModel.isRemoved = false;
    this.customModel.editMode = false;
  }
}
