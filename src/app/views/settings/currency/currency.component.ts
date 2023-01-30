import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { filter, finalize } from 'rxjs';
import { CurrencyService } from 'src/app/_services/currency/currency.service';
import { UtilsService } from 'src/app/_services/utils/utils.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
})
export class CurrencyComponent implements OnInit {
  model: any = {};
  editMode = false;
  cols!: any[];
  data!: any[];
  disabled = false;
  showDialog = false;
  loading = false;
  showGrid = false;
  isInsert = false;

  constructor(
    private currencyService: CurrencyService,
    private messageService: MessageService,
    private utilService: UtilsService
  ) {}

  ngOnInit(): void {
    this.currencyListColumn();
  }

  private currencyListColumn() {
    this.cols = [
      {
        field: 'currencyName',
        header: 'Currency',
        style: { 'text-transform': 'capitalize' },
      },
      {
        field: 'currencySymbol',
        header: 'Symbol',
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

  getAllCurrencies() {
    var data = this.currencyService.getAllCurrencies()[1];
    data.pipe(filter((res) => res.length > 0)).subscribe({
      next: (r: any) => {
        //console.log(r);
        if (!this.isInsert) this.data = r;
        else this.data = this.utilService.lastInsertedData(r);
      },
    });
  }

  isToggle() {
    this.showGrid = !this.showGrid;
    if (this.showGrid) this.getAllCurrencies();
  }

  addCurrency() {
    this.disabled = true;
    this.isInsert = true;
    this.currencyService
      .addCurrency(this.model)
      .pipe(
        finalize(() => {
          this.disabled = false;
        })
      )
      .subscribe({
        next: () => {
          this.model = {};
          this.messageService.add(
            this.utilService.successMessage('Currency Added Successfully')
          );
        },
      });
  }

  viewData(currencyData: any) {
    this.model = { ...currencyData };
    this.editMode = true;
  }

  updateCurrency() {
    this.disabled = true;
    this.currencyService
      .editCurrency(this.model.id, this.model)
      .pipe(
        finalize(() => {
          this.disabled = false;
        })
      )
      .subscribe({
        next: () => {
          this.model = {};
          this.messageService.add(
            this.utilService.successMessage('Currency Edited Successfully')
          );
        },
      });
  }

  deleteCurrency(currencyData: any) {
    this.currencyService.deleteCurrency(currencyData.id).subscribe({
      next: (res: any) => {
        this.messageService.add(this.utilService.successMessage(res.message));
      },
    });
  }

  reset() {
    this.model = {};
    this.editMode = false;
  }
}
