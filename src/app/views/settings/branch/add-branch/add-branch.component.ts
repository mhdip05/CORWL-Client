import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize, map, switchMap, take } from 'rxjs';
import { BranchService } from 'src/app/_services/branch/branch.service';
import { CompanyService } from 'src/app/_services/company/company.service';
import { UtilsService } from 'src/app/_services/utils/utils.service';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss'],
})
export class AddBranchComponent implements OnInit {
  model: any = {};
  rollbackModel: any = {};
  validationModel: any = {};
  cascadeModel: any = { disabledCity: true, load: false };

  isAmend = false;
  editMode = false;
  disabled = false;
  hasValidation = false;

  inputClass = 'form-control form-control-sm';
  responsiveClass =
    'col-xl-3 col-lg-6 col-md-12 col-sm-12 col-xs-12 input-margin-bottom';

  constructor(
    private utilService: UtilsService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private branchService: BranchService
  ) {}

  ngOnInit(): void {
    this.editMode = false;
    this.utilService.queryParamsSanitization();
    this.utilService.turnModalStateErrorOn = false;

    if (this.activatedRoute.snapshot.params['id'] !== undefined) {
      this.getBranchId();
    }
  }

  ngOnDestroy(): void {
    this.utilService.turnModalStateErrorOn = true;
  }

  addBranch() {
    //console.log(this.model);
    //return;
    this.disabled = true;
    this.hasValidation = false;
    this.branchService
      .addBranch(this.model)
      .pipe(
        finalize(() => {
          this.disabled = false;
        })
      )
      .subscribe({
        next: (v: any) => {
          //console.log(v);
          this.messageService.add(
            this.utilService.successMessage(v.message, 2000)
          );
          this.reset();
        },
        error: (e) => {
          this.handleError(e);
        },
      });
  }

  getBranchId() {
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
    this.editMode = false;
    this.model = { ...data };
    setTimeout(() => {
      this.editMode = true;
    }, 0);
    this.isAmend = true;
    this.cascadeModel.disabledCity = false;
  }

  editBranch() {
    //console.log(this.model);
    //return
    this.disabled = true;
    this.branchService
      .updateBranch(this.model)
      .pipe(
        finalize(() => {
          this.disabled = false;
        })
      )
      .subscribe({
        next: (v: any) => {
          //console.log(v)
          this.messageService.add(
            this.utilService.successMessage(v.message, 3000)
          );
          this.validationReset();
        },
        error: (e) => {
          this.handleError(e);
        },
      });
    return;
  }

  handleError(error: any) {
    //console.log(error);
    this.hasValidation = true;
    this.validationModel = { ...this.utilService.errorValidation(error) };
    if (this.validationModel.dbError) {
      this.messageService.add(
        this.utilService.dangerMessage(this.validationModel.dbError, 4000)
      );
    }
  }

  changeCountry(data: any) {
    //console.log(data);
    this.model.countryId = data.countryId;
    this.model.countryName = data.countryName;

    if (data.countryId == 0) {
      this.model.cityId = 0;
      this.model.cityName = null;
      this.cascadeModel.disabledCity = true;
      return;
    }

    this.model.cityId = 0;
    this.model.cityName = null;
    this.cascadeModel.load = true;
    this.cascadeModel.disabledCity = false;
  }

  changeDropdown(data: any) {
    //console.log(data)
    this.model = { ...this.model, ...data };
  }

  changeEmployeeDropdown(data: any, type: string) {
    //console.log(data);
    //return;
    if (type == 'branchIncharge') {
      (this.model.branchInchargeId = data.employeeId),
        (this.model.branchInchargeName = data.employeeName);
    } else {
      (this.model.branchAttentionPersonId = data.employeeId),
        (this.model.branchAttentionPersonName = data.employeeName);
    }
  }

  validationReset() {
    this.validationModel = {};
  }

  reset() {
    this.validationModel = {};
    this.utilService.resetDropDown();
    if (!this.editMode) this.model = {};
    else this.getBranchId();
  }
}
