import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { finalize, filter } from 'rxjs';
import { GridModel } from 'src/app/_models/GridModel';
import { CountryService } from 'src/app/_services/country/country.service';
import { UtilsService } from 'src/app/_services/utils/utils.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  customModel = new GridModel();
  // data = [];
  // cols!: any[];
  // model: any = {};

  // loading = false;
  // disabled = false;
  // isInsert = false;
  // editMode = false;
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
    this.customModel.cols = [
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
      { field: 'createdByName', header: 'Created By' },
    ];
  }

  getAllCountries() {
    var data = this.countryService.getAllCountries()[1];
    data.pipe(filter((res) => res.length > 0)).subscribe({
      next: (r: any) => {
        //console.log(r)
        if (!this.customModel.isInsert) this.customModel.data = r;
        else this.customModel.data = this.utilService.lastInsertedData(r);
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
    this.customModel.disabled = true;
    this.customModel.isInsert = true;
    this.countryService
      .addCountry(this.customModel.model)
      .pipe(
        finalize(() => {
          this.customModel.disabled = false;
        })
      )
      .subscribe({
        next: (r:any) => {
          this.messageService.add(
            this.utilService.successMessage(r.message, 3000)
          );
          this.customModel.model = {};
        },
      });
  }

  viewData(data: any) {
    this.customModel.model = { ...data };
    //console.log(this.model);
    this.customModel.editMode = true;
  }

  updateCountry() {
    this.customModel.disabled = true;
    this.countryService
      .updateCountry(this.customModel.model.id, this.customModel.model)
      .pipe(
        finalize(() => {
          this.customModel.disabled = false;
        })
      )
      .subscribe({
        next: (r: any) => {
          //console.log(r)
          this.messageService.add(
            this.utilService.successMessage(r.message, 3000)
          );
        },
      });
  }

  reset() {
    this.customModel.model = {};
    this.customModel.editMode = false;
  }
}
