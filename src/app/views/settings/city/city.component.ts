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

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent implements OnInit {
  // @ViewChild('addForm') myForm!: ElementRef;
  data = [];
  cols!: any[];
  model: any = {};

  test = false;
  loading = false;
  isAmend = false;
  editMode = false;
  disabled = false;
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
    this.model.countryId = country.countryId;
    this.model.countryName = country.countryName;
  }

  private cityListColumn() {
    this.cols = [
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
    if (this.data.length > 0) return;
    this.cityService.getAllCity().subscribe({
      next: (res: any) => {
        //console.log(res)
        this.data = res;
      },
    });
  }

  addCity() {
    //console.log(this.model);
    //return;
    this.disabled = true;
    this.cityService
      .addCity(this.model)
      .pipe(
        finalize(() => {
          this.disabled = false;
        })
      )
      .subscribe({
        next: (v) => {
          this.messageService.add(
            this.utilService.successMessage('City Added Successfully')
          );
        },
        complete: () => {
          this.model.cityName = null;
        },
      });
  }

  viewData(data: any) {
    //console.log(data)
    this.isAmend = true;
    this.editMode = false;
    this.model = { ...data };

    setTimeout(() => {
      this.editMode = true;
    }, 0);
  }

  updateCity() {
    //console.log(this.model)
    this.disabled = true;
    this.cityService
      .editCity(this.model)
      .pipe(
        finalize(() => {
          this.disabled = false;
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

  reset() {
    this.model = {};
    this.editMode = false;
    this.isAmend = false;
    this.utilService.resetDropDown();
  }
}
