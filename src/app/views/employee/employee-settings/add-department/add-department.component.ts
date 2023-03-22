import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { DepartmentService } from 'src/app/_services/department/department.service';
import { UtilsService } from 'src/app/_services/utils/utils.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss'],
})
export class AddDepartmentComponent implements OnInit {
  model: any = {};
  cols!: any[];
  data!: any[];

  loading = false;
  isInsert = false;
  editMode = false;
  disabled = false;
  showDialog = false;
  isRemoved = false;
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
    this.cols = [
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
        this.data = res;
      },
    });
  }

  changeDropdown(data: any) {
    this.model.departmentHeadId = data.employeeId;
    this.model.departmentHeadName = data.employeeName;
  }

  addDepartment() {
    //console.log(this.model);
    //return;
    this.disabled = true;
    this.departmentService
      .addDepartment(this.model)
      .pipe(
        finalize(() => {
          this.disabled = false;
        })
      )
      .subscribe({
        next: (v: any) => {
          this.messageService.add(
            this.utilService.successMessage(v.message, 2000)
          );
          this.reset();
        },
      });
  }

  updateDepartment() {
    console.log(this.model);
    //return;
    this.disabled = true;
    this.departmentService
      .updateDepartment(this.model)
      .pipe(
        finalize(() => {
          this.disabled = false;
        })
      )
      .subscribe({
        next: (v: any) => {
          console.log(v);
          this.messageService.add(
            this.utilService.successMessage(v.message, 2000)
          );
        },
      });
  }

  viewData(data: any, eventType: string) {
    this.editMode = false;
    this.model = { ...data };

    setTimeout(() => {
      this.editMode = true;
    }, 0);

    if (eventType == 'view') {
      this.isRemoved = true;
    } else {
      this.isRemoved = false;
    }
  }

  pullData() {
    this.getAllDepartment();
  }

  reset() {
    this.model = {};
    this.isRemoved = false;
    this.editMode = false;
  }
}
