import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { filter, map } from 'rxjs';
import { CurrencyService } from 'src/app/_services/currency/currency.service';
import { UtilsService } from 'src/app/_services/utils/utils.service';

@Component({
  selector: 'app-currency-dropdown',
  templateUrl: './currency-dropdown.component.html',
  styleUrls: ['./currency-dropdown.component.scss'],
})
export class CurrencyDropdownComponent implements OnInit {
  showClear = true;
  currentCurrencies: any = [];
  emptyMessage = 'No Record Found';

  @Input() currencies: any = [];
  @Input() selectedCurrency: any;
  @Output() changeCurrency = new EventEmitter();

  constructor(private currencyServices: CurrencyService) {}

  ngOnInit(): void {
    //console.log(this.selectedCurrency)
    this.showClear = false;
  }

  onChange() {
    //console.log('onChange', this.selectedCurrency);
    if (this.selectedCurrency == null) {
      this.checkSelectedCurrency();
      return;
    }

    if (this.selectedCurrency.currencyId == -1) {
      this.checkSelectedCurrency();
      return;
    }

    this.showClear = true;
    this.changeCurrency.emit(this.selectedCurrency);
  }

  checkSelectedCurrency() {
    this.showClear = false;
    this.selectedCurrency = { currencyName: null, currencyId: 0 };
    this.changeCurrency.emit(this.selectedCurrency);
  }

  onShow() {
    //console.log(this.currentCurrencies);
    if (this.currentCurrencies.length > 0) {
      this.currencies = this.currentCurrencies;
      return;
    }
    this.currencyServices
      .getCurrencies()
      .pipe(filter((res) => res.length > 0))
      .subscribe({
        next: (res: any) => {
          //console.log(res);
          let empty = [
            { currencyName: '------ Select Currency -----', currencyId: -1 },
          ];
          this.currencies = [...empty, ...res];
          this.currentCurrencies = [...empty, ...res];
        },
      });
  }
}
