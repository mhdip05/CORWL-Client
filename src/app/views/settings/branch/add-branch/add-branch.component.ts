import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize, map, switchMap, take } from 'rxjs';
import { CustomModel } from 'src/app/_models/CustomModel';
import { DesignModel } from 'src/app/_models/DesignModel';
import { BranchService } from 'src/app/_services/branch/branch.service';
import { CompanyService } from 'src/app/_services/company/company.service';
import { UtilsService } from 'src/app/_services/utils/utils.service';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss'],
})
export class AddBranchComponent implements OnInit {
  customModel = new CustomModel();
  designModel = new DesignModel();

  constructor(
    private utilService: UtilsService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private branchService: BranchService
  ) {}

  ngOnInit(): void {
    this.customModel.editMode = false;
    this.utilService.queryParamsSanitization();
    this.utilService.turnModalStateErrorOn = false;

    if (this.activatedRoute.snapshot.params['id'] !== undefined) {
      this.customModel.editMode = true;
      this.getBranchId();
    }
  }

  ngOnDestroy(): void {
    this.utilService.turnModalStateErrorOn = true;
  }

  addBranch() {
     console.log(this.customModel.model);
    return;
    this.customModel.disabled = true;
    this.branchService
      .addBranch(this.customModel.model)
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
          this.customModel.reset(this.customModel.editMode);
        },
        error: (e) => {
          this.displayError(e);
        },
      });
  }

  getBranchId() {
    if (this.customModel.editMode == false) return;
    this.branchService
      .getBranchById(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: (v) => {
          //console.log(v);
          this.viewData(v);
        },
      });
  }

  viewData(data: any) {
    //console.log(data);
    //return;
    this.customModel.viewData(data);
    this.customModel.cascadeCityModel.disabledCity = false;
  }

  editBranch() {
    //console.log(this.model);
    //return
    this.customModel.disabled = false;
    this.branchService
      .updateBranch(this.customModel.model)
      .pipe(
        finalize(() => {
          this.customModel.disabled = false;
        })
      )
      .subscribe({
        next: (v: any) => {
          //console.log(v)
          this.messageService.add(
            this.utilService.successMessage(v.message, 3000)
          );
          this.customModel.validationReset();
        },
        error: (e) => {
          this.displayError(e);
        },
      });
    return;
  }

  displayError(e: any) {
    const error: any = this.customModel.handleError(e);
    if (error.isDbError) {
      this.messageService.add(
        this.utilService.dangerMessage(error.dbError, 4000)
      );
    }
  }

  changeEmployeeDropdown(data: any, type: string) {
    //console.log(data);
    //return;
    if (type == 'branchIncharge') {
      (this.customModel.model.branchInchargeId = data.employeeId),
        (this.customModel.model.branchInchargeName = data.employeeName);
    } else {
      (this.customModel.model.branchAttentionPersonId = data.employeeId),
        (this.customModel.model.branchAttentionPersonName = data.employeeName);
    }
  }

}
