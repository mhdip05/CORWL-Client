import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridModel } from 'src/app/_models/GridModel';
import { PaginationModel } from 'src/app/_models/PaginationModel';
import { EmployeeService } from 'src/app/_services/employee/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  customModel = new GridModel();
  pagination: any;
  paginationModel = new PaginationModel(1, 5);
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllEmployee(
      this.paginationModel.pageNumber,
      this.paginationModel.pageSize
    );
  }

  private employeeColumn() {
    this.customModel.cols = [
      {
        field: 'id',
        header: 'Emp Id',
        style: { 'text-transform': 'capitalize' },
      },
      {
        field: 'firstName',
        header: 'First Name',
        style: { 'text-transform': 'capitalize' },
      },
      {
        field: 'lastName',
        header: 'Last Name',
        style: { 'text-transform': 'capitalize' },
      },
      {
        field: 'gender',
        header: 'Gender',
        style: { 'text-transform': 'capitalize' },
      },
      {
        field: 'idType',
        header: 'Id Type',
        style: { 'text-transform': 'capitalize' },
      },
      {
        field: 'idNo',
        header: 'Id No',
        style: { 'text-transform': 'capitalize' },
      },
      {
        field: 'dob',
        header: 'Dob',
        type: 'date',
        format: 'dd/MM/yyyy',
        style: { 'margin-left': '5px' },
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

  getAllEmployee(pageNumber: number, pageSize: number) {
    this.employeeService.getAllEmployee(pageNumber, pageSize).subscribe({
      next: (v: any) => {
        //console.log(v);
        this.customModel.data = v.result;
        this.pagination = v.pagination;

        this.employeeColumn();
      },
    });
  }

  url(){
    this.router.navigateByUrl('employee/add-employee')
  }

  edit(event:any) {
    this.router.navigateByUrl('employee/edit-employee/'+event.id)
  }

  paginate($event: any) {
    var pageNumber = $event.page + 1;
    var pageSize = $event.rows;

    this.getAllEmployee(pageNumber, pageSize);
  }
}
