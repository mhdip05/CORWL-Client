import { Component, OnInit } from '@angular/core';
import { CustomModel } from 'src/app/_models/CustomModel';
import { DesignModel } from 'src/app/_models/DesignModel';
import { EmployeeService } from 'src/app/_services/employee/employee.service';
@Component({
  selector: 'app-user-document',
  templateUrl: './user-document.component.html',
  styleUrls: ['./user-document.component.scss'],
})
export class UserDocumentComponent implements OnInit {
  customModel = new CustomModel();
  designModel = new DesignModel();

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.customModel.model = {
      ...this.customModel.model,
      ...{ employeeId: 1 },
    };
  }

  addDocumentInfo() {
    const formData = new FormData();
    const modelData = this.customModel.model;
    var files = this.customModel.files;

    Object.entries(modelData).forEach(([key, value]: any) => {
      formData.append(key, value);
    });

    for (const file of files) {
      formData.append('files', file, file.name);
    }
    //console.log(this.customModel)
   // return;
    this.employeeService.saveEmployeeDocumentInfo(formData).subscribe({
      next: (v) => {
        console.log(v);
      },
    });
  }
}
