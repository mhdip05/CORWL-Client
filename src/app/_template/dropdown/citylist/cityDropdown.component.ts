import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Dropdown } from 'primeng/dropdown';
import { filter, take } from 'rxjs';
import { CityService } from 'src/app/_services/city/city.service';

@Component({
  selector: 'app-cityDropdown',
  templateUrl: './cityDropdown.component.html',
  styleUrls: ['./cityDropdown.component.scss'],
})
export class CityDropdownComponent implements OnInit {
  showClear = true;
  //currentCities = [];
  emptyMessage = 'No Record Found';

  @Input() cities: any = [];
  @Input() disabledCity = false;
  @Input() load = false;
  @Input() countryId = 0;
  @Input() selectedCity: any;
  @Output() changeCity = new EventEmitter();

  constructor(private cityServices: CityService) {}

  ngOnInit(): void {
    //console.log(this.selectedCity, this.cities)
    this.showClear = false;
  }

  onCityChange() {
    //console.log('onChange', this.selectedCity);
    if (this.selectedCity == null) {
      this.showClear = false;
      this.selectedCity = { cityName: null, cityId: 0 };
      this.changeCity.emit(this.selectedCity);
      return;
    }

    this.showClear = true;
    this.changeCity.emit(this.selectedCity);
  }

  onShow(event: any) {
    if (this.load) this.cities = [];
    this.cityServices
      .getAllCitiesByCountry(this.countryId)[1]
      .pipe(
        filter((res) => res.length > 0),
        take(1)
      )
      .subscribe({
        next: (res: any) => {
          this.cities = [...res];
        },
      });
  }

}
