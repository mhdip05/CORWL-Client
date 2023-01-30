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
import { CompanyService } from 'src/app/_services/company/company.service';
import { UtilsService } from 'src/app/_services/utils/utils.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss'],
})
export class AddCompanyComponent implements OnInit, OnDestroy {
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
    private router: Router,
    private utilService: UtilsService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.editMode = false;
    this.utilService.queryParamsSanitization();
    this.utilService.turnModalStateErrorOn = false;

    if (this.activatedRoute.snapshot.params['id'] !== undefined) {
      this.getCompanyById();
    }
  }

  ngOnDestroy(): void {
    this.utilService.turnModalStateErrorOn = true;
  }

  addCompany() {
    //console.log(this.model);
    //return;
    this.disabled = true;
    this.hasValidation = false;
    this.companyService
      .addCompany(this.model)
      .pipe(
        finalize(() => {
          this.disabled = false;
        })
      )
      .subscribe({
        next: (v) => {
          this.messageService.add(
            this.utilService.successMessage('Company Saved Successfully', 2000)
          );
          this.reset();
        },
        error: (e) => {
          this.handleError(e);
        },
      });
  }

  getCompanyById() {
    this.activatedRoute.params
      .pipe(
        map((data) => data['id']),
        switchMap((id) => this.companyService.getCompanyById(id)),
        filter((res) => !!res)
      )
      .subscribe((data) => {
        //console.log('data',data)
        this.viewData(data);
        //this.model = {...data}
      });
  }

  viewData(data: any) {
    this.editMode = false;
    this.model = { ...data };
    setTimeout(() => {
      this.editMode = true;
    }, 0);
    this.isAmend = true;
    this.cascadeModel.disabledCity = false;
  }

  editCompany() {
    //console.log(this.model);
    //return
    this.disabled = true;
    this.companyService
      .updateCompany(this.model.id, this.model)
      .pipe(
        finalize(() => {
          this.disabled = false;
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
          this.validationReset();
        },
        error: (e) => {
          this.handleError(e);
        },
      });
    return;
  }

  handleError(error: any) {
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

  changeDropDown(data: any) {
    this.model = { ...this.model, ...data };
  }

  changeCurrencyDropDown(data: any, type?: String) {
    //console.log(data)
    if (type == 'internationalCurrency') {
      this.model.interNationalCurrencyId = data.currencyId;
      this.model.interNationalCurrencyName = data.currencyName;
    } else {
      this.model.localCurrencyId = data.currencyId;
      this.model.localCurrencyName = data.currencyName;
    }
  }

  validationReset() {
    this.validationModel = {};
  }

  reset() {
    this.validationModel = {};
    this.utilService.resetDropDown();
    if (!this.editMode) this.model = {};
    else this.getCompanyById();
  }

  // @HostListener('window:keyup.w', ['$event']) w(e: KeyboardEvent) {
  //   console.log('w captured', e);
  // }

  // @HostListener('window:keyup.w', ['$event']) s(e: KeyboardEvent) {
  //   console.log('shift w captured', e);
  // }

  // @HostListener('window:keyup.f8', ['$event']) sw(e: KeyboardEvent) {
  //   this.rollbackModel = {...this.model}
  // }

  rollback() {
    //this.cascadeModel.disabledCity = true;
    // this.editMode = false;
    // this.model = {...this.rollbackModel}
    // setTimeout(() => {
    //   this.editMode = true;
    // }, 0);
    // console.log(this.rollbackModel)
    // console.log(this.model)
  }

  viewDataFromResolver() {
    this.isAmend = true;
    this.activatedRoute.snapshot.data['companyData'].pipe(take(1)).subscribe({
      next: (v: any) => {
        this.editMode = false;
        this.model = { ...v };
        setTimeout(() => {
          this.editMode = true;
        }, 0);

        this.cascadeModel.disabledCity = false;
      },
    });
  }

  // permissionForEdit = (companyId: number) => {
  //   if (this.utilService.checkIntegerInUrl(companyId) == false) {
  //     this.editMode = true;
  //     this.allowEdit = false;
  //   } else {
  //     this.allowEdit = true;
  //     this.getCompanyById();
  //   }
  // };

  TestData() {
    this.model = {};
    var data = {
      companyName: 'test',
      companyCode: '120',
      mobileNo: '01791468094',
      address: 'Dhaka, Bangladesh',
      zipCode: '1200',
    };
    //this.hasValidation = false
    this.model = data;
  }
}
