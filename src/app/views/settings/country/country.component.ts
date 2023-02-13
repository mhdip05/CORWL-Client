import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { CountryService } from 'src/app/_services/country/country.service';
import { UtilsService } from 'src/app/_services/utils/utils.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  data = [];
  cols!: any[];
  model: any = {};

  loading = false;
  disabled = false;
  editMode = false;
  @Input() showGrid = false;

  constructor(
    private countryService: CountryService,
    private messageService: MessageService,
    private utilService: UtilsService
  ) {}

  ngOnInit(): void {
    this.countryListColumn();

    if (this.showGrid == true) this.getAllCountries();
  }

  private countryListColumn() {
    this.cols = [
      {
        field: 'countryName',
        header: 'Country',
        style: { 'text-transform': 'capitalize' },
      },
      {
        field: 'countryAlias',
        header: 'Alias',
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

  getAllCountries() {
    if (this.data.length > 0) return;
    this.countryService.getAllCountries().subscribe({
      next: (res: any) => {
        this.data = res;
      },
    });
  }

  isToggle() {
    this.showGrid = !this.showGrid;
    if (this.showGrid == true) {
      this.getAllCountries();
    }

    // setTimeout(() => {
    //   document.getElementById("countryGrid")?.scrollIntoView()
    // }, 100);
  }

  addCountry() {
    this.disabled = true;
    this.countryService
      .addCountry(this.model)
      .pipe(
        finalize(() => {
          this.disabled = false;
        })
      )
      .subscribe({
        next: () => {
          this.model = {};
        },
      });
  }

  viewData(data: any) {
    this.model = { ...data };
    console.log(this.model);
    this.editMode = true;
  }

  updateCountry() {
    this.disabled = true;
    this.countryService
      .updateCountry(this.model)
      .pipe(
        finalize(() => {
          this.disabled = false;
        })
      )
      .subscribe({
        next: (r: any) => {
          this.messageService.add(
            this.utilService.successMessage(r.message, 3000)
          );
        },
      });
  }

  reset() {
    this.model = {};
    this.editMode = false;
  }
}
