import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { UtilsService } from 'src/app/_services/utils/utils.service';
import { CompanyService } from '../../../_services/company/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  model: any = {};
  editMode = false;
  cols!: any[];
  data!: any[];
  disabled = false;
  showDialog = false;
  loading = false;
  isInsert = false;

  constructor(
    private companyService: CompanyService,
    private messageService: MessageService,
    private utilsService: UtilsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.companyListColumn();
    this.getAllCompanies();
  }

  private companyListColumn() {
    this.cols = [
      {
        field: 'companyName',
        header: 'Name',
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

  getAllCompanies() {
    const companyData$ = this.companyService.getAllCompanies()[1];
    companyData$.subscribe({
      next: (r) => {
        //console.log(r)
        if (!this.isInsert) this.data = r;
        else this.data = this.utilsService.lastInsertedData(r);
      },
    });
  }

  setCompany() {
    this.router.navigateByUrl('/settings/add-company');
  }

  viewData(companyData: any) {
    this.router.navigateByUrl('settings/edit-company/' + companyData.id);
  }

  deleteCompany(companyData: any) {
    //console.log(companyData)
    this.companyService.deleteCompany(companyData.id).subscribe({
      next: (res: any) => {
        //console.log(res);
        this.messageService.add({
          icon: 'pi-check-circle',
          severity: 'success',
          summary: 'Success',
          life: 1300,
          detail: res.message,
        });
      },
    });
  }
}
