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
import { finalize, take } from 'rxjs';
import { CityService } from 'src/app/_services/city/city.service';
import { CountryService } from 'src/app/_services/country/country.service';
import { UtilsService } from 'src/app/_services/utils/utils.service';

@Component({
  selector: 'app-countryDropdown',
  templateUrl: './countryDropdown.component.html',
  styleUrls: ['./countryDropdown.component.scss'],
})
export class CountryDropdownComponent implements OnInit {
  emptyMessage = 'No Record Found';
  currentCountries: any = [];
  showClear = true;
  @Input() countries: any = [];
  @Input() editMode = false;
  @Input() disabled = false;
  @Input() selectedCountry: any;
  @Input() cascade = true;
  @Input() autoDisplayFirst = true;
  @Input() applyDefaultText = false;
  @Output() changeCountry = new EventEmitter();

  constructor(
    private countryServices: CountryService,
    private cityService: CityService,
    private utilService: UtilsService
  ) {}

  ngOnInit(): void {
    this.showClear = false;
  }

  onChange() {
    //console.log(this.selectedCountry)
    if (this.selectedCountry == null) {
      this.checkSelectedCountry();
      return;
    }

    if (this.selectedCountry.countryId == -1) {
      this.checkSelectedCountry();
      return;
    }

    this.showClear = true;
    this.changeCountry.emit(this.selectedCountry);

    if (this.cascade) {
      this.cityService
        .getCityByCountryApi(this.selectedCountry.countryId, true)
        .pipe(take(1))
        .subscribe();
    }
  }

  checkSelectedCountry() {
    this.selectedCountry = { countryName: null, countryId: 0 };
    this.showClear = false;
    this.changeCountry.emit(this.selectedCountry);
  }

  onShow(event: any) {
    //console.log(this.selectedCountry)
    if (this.currentCountries.length > 0) {
      this.countries = this.currentCountries;
      return;
    }
    this.emptyMessage = 'Loading...';

    this.countryServices
      .getCountries()
      .pipe(take(1))
      .subscribe({
        next: (res: any) => {
          let empty: any = [];
          if (this.applyDefaultText == true) {
            empty = [
              {
                countryName: this.utilService.dropdownDefaultText(),
                countryId: -1,
              },
            ];
          }
          this.countries = [...res];
          this.currentCountries = [...res];
        },
      });
  }
}
