import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { filter, take } from 'rxjs';
import { DesignationService } from 'src/app/_services/designation/designation.service';
import { UtilsService } from 'src/app/_services/utils/utils.service';

@Component({
  selector: 'app-designation-dropdown',
  templateUrl: './designation-dropdown.component.html',
  styleUrls: ['./designation-dropdown.component.scss'],
})
export class DesignationDropdownComponent implements OnInit {
  showClear = true;
  currentDesignations: any = [];
  emptyMessage = 'No Record Found';

  @Input() designations: any = [];
  @Input() disabledDesignation = false;
  @Input() load = false;
  @Input() selectedDesignation: any;
  @Input() applyDefaultText = false;
  @Output() changeDesignation = new EventEmitter();

  constructor(
    private designationService: DesignationService,
    private utilService: UtilsService
  ) {}

  ngOnInit(): void {
    //console.log(this.selectedDesignation, this.designations)
    this.showClear = false;
  }

  onChange() {
    //console.log('onChange', this.selectedDesignation);
    if (this.selectedDesignation == null) {
      this.showClear = false;
      this.selectedDesignation = { DesignationName: null, DesignationId: 0 };
      this.changeDesignation.emit(this.selectedDesignation);
      return;
    }

    this.showClear = true;
    this.changeDesignation.emit(this.selectedDesignation);
  }

  onShow() {
    if (this.currentDesignations.length > 0) {
      this.designations = this.currentDesignations;
      return;
    }
    this.designationService
      .getDesignationDropdown()
      .pipe(
        filter((res: any) => res.length > 0),
        take(1)
      )
      .subscribe({
        next: (res: any) => {
          let empty: any = [];
          if (this.applyDefaultText == true) {
            empty = [
              {
                designationName: this.utilService.dropdownDefaultText(),
                designationId: -1,
              },
            ];
          }
          this.designations = [...empty, , ...res];
          this.currentDesignations = [...empty, ...res];
        },
      });
  }
}
