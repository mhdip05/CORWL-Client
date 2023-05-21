import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BranchService } from '../../../_services/branch/branch.service';
import { GridModel } from 'src/app/_models/GridModel';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss'],
})
export class BranchComponent implements OnInit {
  customModel = new GridModel();
  
  constructor(private branchService: BranchService, private router: Router) {}

  ngOnInit(): void {
    this.branchListColumn();
    this.getAllBranches();
  }

  private branchListColumn() {
    this.customModel.cols = [
      {
        field: 'branchName',
        header: 'Name',
        style: { 'text-transform': 'capitalize' },
      },
      {
        field: 'branchCode',
        header: 'Code',
        style: { 'text-transform': 'capitalize' },
      },
      {
        field: 'cityName',
        header: 'City',
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
      { field: 'createdBy', header: 'Created By' },
    ];
  }

  getAllBranches() {
    this.branchService.getAllBranches().subscribe({
      next: (res: any) => {
        //console.log(res)
        this.customModel.data = res;
      },
    });
  }

  viewData(data: any) {
    this.router.navigateByUrl('settings/edit-branch/' + data.id);
  }

  setBranch() {
    this.router.navigateByUrl('/settings/add-branch');
  }

  pullData(){
    //console.log("hello world")
    this.getAllBranches();
  }
}
