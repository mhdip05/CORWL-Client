import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { UtilsService } from '../../../_services/utils/utils.service';
import { CityService } from '../../../_services/city/city.service';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { GridModel } from 'src/app/_models/GridModel';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent implements OnInit {
  customModel = new GridModel();
  @Input() showGrid = false;

  selectedCountry: any = {};
  country: any;

  constructor(
    private utilService: UtilsService,
    private cityService: CityService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.cityListColumn();
    if(this.showGrid) this.getAllCity();
  }

  changeCountry(country: any) {
    //console.log(country);
    this.customModel.model.countryId = country.countryId;
    this.customModel.model.countryName = country.countryName;
  }

  private cityListColumn() {
    this.customModel.cols = [
      {
        field: 'cityName',
        header: 'City',
      },
      {
        field: 'countryName',
        header: 'Country',
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

  isToggle() {
    this.showGrid = !this.showGrid;
    this.getAllCity();
  }

  getAllCity() {
   // if (this.customModel.data.length > 0) return;
    this.fetchAllCity();
  }

  private fetchAllCity(){
    this.cityService.getAllCity().subscribe({
      next: (res: any) => {
        //console.log(res)
        this.customModel.data = res;
      },
    });
  }

  addCity() {
    //console.log(this.model);
    //return;
    this.customModel.disabled = true;
    this.cityService
      .addCity(this.customModel.model)
      .pipe(
        finalize(() => {
          this.customModel.disabled = false;
        })
      )
      .subscribe({
        next: (v) => {
          this.messageService.add(
            this.utilService.successMessage('City Added Successfully')
          );
        },
        complete: () => {
          this.customModel.model.cityName = null;
        },
      });
  }

  viewData(data: any) {
    //console.log(data)
    this.customModel.isAmend = true;
    this.customModel.editMode = false;
    this.customModel.model = { ...data };

    setTimeout(() => {
      this.customModel.editMode = true;
    }, 0);
  }

  updateCity() {
    //console.log(this.model)
    this.customModel.disabled = true;
    this.cityService
      .editCity(this.customModel.model)
      .pipe(
        finalize(() => {
          this.customModel.disabled = false;
        })
      )
      .subscribe({
        next: (r: any) => {
          //console.log(r);
          this.messageService.add(
            this.utilService.successMessage('City Updated Successfully')
          );
        },
        complete: () => {
          this.reset();
        },
      });
  }

  pullData(){
    this.fetchAllCity();
  }

  reset() {
    this.customModel.model = {};
    this.customModel.editMode = false;
    this.customModel.isAmend = false;
    this.utilService.resetDropDown();
  }
}
