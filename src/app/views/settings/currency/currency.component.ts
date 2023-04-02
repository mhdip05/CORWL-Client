import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { filter, finalize } from 'rxjs';
import { CurrencyService } from 'src/app/_services/currency/currency.service';
import { UtilsService } from 'src/app/_services/utils/utils.service';
import { GridModel } from 'src/app/_models/GridModel';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
})
export class CurrencyComponent implements OnInit {
  customModel = new GridModel();
  @Input() showGrid = false;

  constructor(
    private currencyService: CurrencyService,
    private messageService: MessageService,
    private utilService: UtilsService
  ) {}

  ngOnInit(): void {
    this.currencyListColumn();
    if(this.showGrid) this.getAllCurrencies()
  }

  private currencyListColumn() {
    this.customModel.cols = [
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
        if (!this.customModel.isInsert) this.customModel.data = r;
        else this.customModel.data = this.utilService.lastInsertedData(r);
      },
    });
  }

  isToggle() {
    this.showGrid = !this.showGrid;
    if (this.showGrid) this.getAllCurrencies();
  }

  addCurrency() {
    this.customModel.disabled = true;
    this.customModel.isInsert = true;
    this.currencyService
      .addCurrency(this.customModel.model)
      .pipe(
        finalize(() => {
          this.customModel.disabled = false;
        })
      )
      .subscribe({
        next: () => {
          this.customModel.model = {};
          this.messageService.add(
            this.utilService.successMessage('Currency Added Successfully')
          );
        },
      });
  }

  viewData(currencyData: any) {
    this.customModel.model = { ...currencyData };
    this.customModel.editMode = true;
  }

  updateCurrency() {
    this.customModel.disabled = true;
    this.currencyService
      .editCurrency(this.customModel.model.id, this.customModel.model)
      .pipe(
        finalize(() => {
          this.customModel.disabled = false;
        })
      )
      .subscribe({
        next: () => {
          this.customModel.model = {};
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

}
