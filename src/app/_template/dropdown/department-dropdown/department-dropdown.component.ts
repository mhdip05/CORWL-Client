import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { filter, take } from 'rxjs';
import { DepartmentService } from 'src/app/_services/department/department.service';
import { UtilsService } from 'src/app/_services/utils/utils.service';

@Component({
  selector: 'app-department-dropdown',
  templateUrl: './department-dropdown.component.html',
  styleUrls: ['./department-dropdown.component.scss'],
})
export class DepartmentDropdownComponent implements OnInit {
  showClear = true;
  currentdepartments: any = [];
  emptyMessage = 'No Record Found';

  @Input() departments: any = [];
  @Input() disabledDepartment = false;
  @Input() load = false;
  @Input() selectedDepartment: any;
  @Input() applyDefaultText = false;
  @Output() changeDepartment = new EventEmitter();

  constructor(
    private departmentService: DepartmentService,
    private utilService: UtilsService
  ) {}

  ngOnInit(): void {
    //console.log(this.selectedDepartment, this.departments)
    this.showClear = false;
  }

  onChange() {
    //console.log('onChange', this.selectedDepartment);
    if (this.selectedDepartment == null) {
      this.showClear = false;
      this.selectedDepartment = { DepartmentName: null, DepartmentId: 0 };
      this.changeDepartment.emit(this.selectedDepartment);
      return;
    }

    this.showClear = true;
    this.changeDepartment.emit(this.selectedDepartment);
  }

  onShow() {
    if (this.currentdepartments.length > 0) {
      this.departments = this.currentdepartments;
      return;
    }
    this.departmentService
      .getDepartmentDropdown()
      .pipe(
        filter((res: any) => res.length > 0),
        take(1)
      )
      .subscribe({
        next: (res: any) => {
          let empty: any = [];
          if (this.applyDefaultText == true) {
            empty = [
              {
                departmentName: this.utilService.dropdownDefaultText(),
                departmentId: -1,
              },
            ];
          }
          this.departments = [...empty,...res];
          this.currentdepartments = [...empty,...res];
        },
      });
  }
}
