import { Component, OnInit } from '@angular/core';
import { TestAppService } from 'src/app/_services/test/test-app.service';

@Component({
  selector: 'app-grid-test',
  templateUrl: './grid-test.component.html',
  styleUrls: ['./grid-test.component.scss'],
})
export class GridTestComponent implements OnInit {
  employees: any = [];
  pagination: any;
  cols!: any[];

  constructor(private testAppService: TestAppService) {}

  ngOnInit(): void {
    this.getAllEmployeTest();
  }

  private employeeColumn() {
    this.cols = [
      { field: 'emp_id', header: 'Emp Id' },
      { field: 'emp_code', header: 'Emp Code' },
      { field: 'emp_firstname', header: 'First Name' },
      { field: 'emp_lastname', header: 'Last Name' },
      { field: 'emp_blood_group', header: 'Blood Group' },
      { field: 'emp_dateofbirth', header: 'DOB' },
      // {
      //   field: 'emp_dateofbirth',
      //   header: 'Previous related position allowence status',
      // },
      // { field: 'emp_dateofjoin', header: 'DOJ' },
      // { field: 'emp_gender', header: 'gender' },
      // { field: 'emp_marital_status', header: 'Marital Status' },
      // { field: 'branch_id', header: 'Branch Id' },
      // { field: 'branch_id', header: 'Branch Id' },
      // { field: 'branch_id', header: 'Branch Id' },
      // { field: 'emp_dateofbirth', header: 'Date of Birth' },
      //  { field: 'emp_dateofbirth', header: 'Previous related position allowence status' },
      // { field: 'emp_dateofbirth', header: 'Dob' },
      // { field: 'emp_dateofbirth', header: 'Branch Id' },
      // { field: 'branch_id', header: 'Branch Id' },
      // { field: 'emp_code', header: 'Paraphrase Data' },
      // { field: 'emp_code', header: 'Designer ignoracne since varification tool' },
      //{ field: 'emp_code', header: 'Officer code' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      { field: 'comments', header: 'Management Comments', width: '20%' },
      //  { field: 'comments', header: 'Supervisor Comments' },
      //  { field: 'comments', header: 'User Comments' },
      //  { field: 'comments', header: 'Teamleader Comments' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      // { field: 'emp_code', header: 'Different path status' },
      //{ field: 'comments', header: 'Supervisor Comments', width: '20%' },
      //{ field: 'comments', header: 'Supervisor Comments', width: '20%' },
    ];
  }

  display = false;

  showDialog(){
    this.display = true;
  }

  getAllEmployeTest() {
    this.testAppService.getAllEmployeeTest(1, 10).subscribe({
      next: (employee) => {
        console.log(employee);
        this.employees = employee.result;
        this.pagination = employee.pagination;

        this.employeeColumn();
      },
      complete: () => {},
    });
  }
}
