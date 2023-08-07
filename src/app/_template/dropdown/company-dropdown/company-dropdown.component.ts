import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { filter } from 'rxjs';
import { CompanyService } from 'src/app/_services/company/company.service';
import { UtilsService } from 'src/app/_services/utils/utils.service';

@Component({
  selector: 'app-company-dropdown',
  templateUrl: './company-dropdown.component.html',
  styleUrls: ['./company-dropdown.component.scss'],
})
export class CompanyDropdownComponent implements OnInit {
  emptyMessage = 'No Record Found';
  currentCompanies: any = [];
  showClear = true;
  @Input() companies: any = [];
  @Input() editMode = false;
  @Input() disabled = false;
  @Input() selectedCompany: any;
  @Input() applyDefaultText = false;
  @Input() readonly = false;
  @Output() changeCompany = new EventEmitter();
  @Output() onBlur = new EventEmitter();

  constructor(
    private companyService: CompanyService,
    private utilService: UtilsService
  ) {}

  ngOnInit(): void {
    this.showClear = false;
  }

  blur(event:any){
    this.onBlur.emit(event);
  }

  onChange() {
    //console.log(this.selectedCompany)
    if (this.selectedCompany == null) {
      this.checkSelected();
      return;
    }

    if (this.selectedCompany.companyId == -1) {
      this.checkSelected();
      return;
    }

    this.showClear = true;
    this.changeCompany.emit(this.selectedCompany);
  }

  checkSelected() {
    this.showClear = false;
    this.selectedCompany = { companyName: null, companyId: 0 };
    this.changeCompany.emit(this.selectedCompany);
  }

  onShow() {
    if (this.currentCompanies.length > 0) {
      this.companies = this.currentCompanies;
      return;
    }
    this.emptyMessage = 'Loading...';

    this.companyService
      .GetCompanyDropdown()
      .pipe(filter((res: any) => res.length > 0))
      .subscribe({
        next: (res: any) => {
          //console.log(res)
          let empty: any = [];
          if (this.applyDefaultText == true) {
            empty = [
              {
                companyName: this.utilService.dropdownDefaultText(),
                companyId: -1,
              },
            ];
          }

          this.companies = [...empty, ...res];
          this.currentCompanies = [...empty, ...res];
        },
      });
  }
}
