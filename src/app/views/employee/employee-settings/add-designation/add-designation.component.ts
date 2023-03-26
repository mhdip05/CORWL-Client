import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { DesignationService } from 'src/app/_services/designation/designation.service';
import { UtilsService } from 'src/app/_services/utils/utils.service';

@Component({
  selector: 'app-add-designation',
  templateUrl: './add-designation.component.html',
  styleUrls: ['./add-designation.component.scss'],
})
export class AddDesignationComponent implements OnInit {
  data = [];
  cols!: any[];
  model: any = {};

  test = false;
  loading = false;
  isAmend = false;
  editMode = false;
  disabled = false;
  gridLoad = false;
  @Input() showGrid = false;

  selectedCountry: any = {};
  country: any;

  constructor(
    private utilService: UtilsService,
    private designationService: DesignationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.designationListColumn();
    this.getAllDesignation();
  }

  changeDropdown(data: any) {
    //console.log(data)
    this.model = { ...this.model, ...data };
  }

  private designationListColumn() {
    this.cols = [
      {
        field: 'designationName',
        header: 'Designation',
      },
      {
        field: 'abbreviation',
        header: 'Abbreviation',
      },
      {
        field: 'departmentName',
        header: 'Department',
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
      {
        field: 'createdByName',
        header: 'Created By',
        style: { 'text-transform': 'capitalize' },
      },
    ];
  }

  getAllDesignation() {
    this.designationService.getAllDesignation().subscribe({
      next: (res: any) => {
        //console.log(res)
        this.data = res;
      },
      complete: () => {
        this.utilService.turnLoadingBarOn = true;
        this.gridLoad = false;
      },
    });
  }

  addDesignation() {
    //console.log(this.model);
    //return;
    this.disabled = true;
    this.designationService
      .addDesignation(this.model)
      .pipe(
        finalize(() => {
          this.disabled = false;
        })
      )

      .subscribe({
        next: (v: any) => {
          this.messageService.add(
            this.utilService.successMessage(v.message, 2000)
          );
        },
        complete: () => {
          this.refreshGrid();
        },
      });
  }

  viewData(data: any) {
    console.log(data);
    this.isAmend = true;
    this.editMode = false;
    this.model = { ...data };

    setTimeout(() => {
      this.editMode = true;
    }, 0);
  }

  updateDesignation() {
    //console.log(this.model)
    this.disabled = true;
    this.designationService
      .updateDesignation(this.model)
      .pipe(
        finalize(() => {
          this.disabled = false;
        })
      )
      .subscribe({
        next: (r: any) => {
          //console.log(r);
          this.messageService.add(
            this.utilService.successMessage(r.message, 2000)
          );
        },
        complete: () => {
          this.reset();
        },
      });
  }

  refreshGrid() {
    this.utilService.turnLoadingBarOn = false;
    this.gridLoad = true;
    this.getAllDesignation();
  }

  pullData() {
    this.getAllDesignation();
  }

  reset() {
    this.model = {};
    this.editMode = false;
    this.isAmend = false;
    this.utilService.resetDropDown();
  }
}
