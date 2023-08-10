import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { filter, finalize, map, Observable, of, switchMap, take } from 'rxjs';
import { CustomModel } from 'src/app/_models/CustomModel';
import { DesignModel } from 'src/app/_models/DesignModel';
import { CompanyService } from 'src/app/_services/company/company.service';
import { UtilsService } from 'src/app/_services/utils/utils.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss'],
})
export class AddCompanyComponent implements OnInit, OnDestroy {
  customModel = new CustomModel();
  designModel = new DesignModel();

  constructor(
    private router: Router,
    private utilService: UtilsService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.customModel.editMode = false;
    this.utilService.queryParamsSanitization();
    this.utilService.turnModalStateErrorOn = false;

    if (this.activatedRoute.snapshot.params['id'] !== undefined) {
      this.customModel.editMode = true;
      this.getCompanyById();
    }
  }

  ngOnDestroy(): void {
    this.utilService.turnModalStateErrorOn = true;
  }

  addCompany() {
    //console.log(this.customModel.model);
    //return;
    this.customModel.disabled = true;
    this.customModel.hasValidation = false;
    this.companyService
      .addCompany(this.customModel.model)
      .pipe(
        finalize(() => {
          this.customModel.disabled = false;
        })
      )
      .subscribe({
        next: (v) => {
          this.messageService.add(
            this.utilService.successMessage('Company Saved Successfully', 2000)
          );
          this.customModel.reset(this.customModel.editMode);
        },
        error: (e) => {
          this.displayError(e);
        },
      });
  }

  displayError(e: any) {
    const error: any = this.customModel.handleError(e);
    if (error.isDbError) {
      this.messageService.add(
        this.utilService.dangerMessage(error.dbError, 4000)
      );
    }
  }
  
  getCompanyById() {
    if (this.customModel.editMode == false) return;
    this.activatedRoute.params
      .pipe(
        map((data: any) => data['id']),
        switchMap((id) => this.companyService.getCompanyById(id)),
        filter((res) => !!res)
      )
      .subscribe((data) => {
        //console.log('data',data)
        this.viewData(data);
      });
  }

  viewData(data: any) {
    this.customModel.viewData(data);
    this.customModel.cascadeCityModel.disabledCity = false;
  }

  editCompany() {
    //console.log(this.customModel.model);
    //return
    this.customModel.disabled = true;
    this.companyService
      .updateCompany(this.customModel.model.id, this.customModel.model)
      .pipe(
        finalize(() => {
          this.customModel.disabled = false;
        })
      )
      .subscribe({
        next: (v) => {
          //console.log(v)
          this.messageService.add(
            this.utilService.successMessage(
              'Company Updated Successfully',
              3000
            )
          );
          this.customModel.validationReset();
        },
        error: (e) => {
          this.displayError(e);
        },
      });
    return;
  }

  changeCurrencyDropDown(data: any, type?: String) {
    //console.log(data)
    if (type == 'internationalCurrency') {
      this.customModel.model.interNationalCurrencyId = data.currencyId;
      this.customModel.model.interNationalCurrencyName = data.currencyName;
    } else {
      this.customModel.model.localCurrencyId = data.currencyId;
      this.customModel.model.localCurrencyName = data.currencyName;
    }
  }

  viewDataFromResolver() {
    this.customModel.isAmend = true;
    this.activatedRoute.snapshot.data['companyData'].pipe(take(1)).subscribe({
      next: (v: any) => {
        this.customModel.editMode = false;
        this.customModel.model = { ...v };
        setTimeout(() => {
          this.customModel.editMode = true;
        }, 0);

        this.customModel.cascadeCityModel.disabledCity = false;
      },
    });
  }
}
