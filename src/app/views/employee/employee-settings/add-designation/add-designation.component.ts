import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { GridModel } from 'src/app/_models/GridModel';
import { DesignationService } from 'src/app/_services/designation/designation.service';
import { UtilsService } from 'src/app/_services/utils/utils.service';

@Component({
  selector: 'app-add-designation',
  templateUrl: './add-designation.component.html',
  styleUrls: ['./add-designation.component.scss'],
})
export class AddDesignationComponent implements OnInit {
  customModel = new GridModel();
  @Input() showGrid = false;

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
    this.customModel.model = { ...this.customModel.model, ...data };
  }

  private designationListColumn() {
    this.customModel.cols = [
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
        this.customModel.data = res;
      },
      complete: () => {
        this.utilService.turnLoadingBarOn = true;
        this.customModel.gridLoad = false;
      },
    });
  }

  addDesignation() {
    //console.log(this.customModel.model);
    //return;
    this.customModel.disabled = true;
    this.designationService
      .addDesignation(this.customModel.model)
      .pipe(
        finalize(() => {
          this.customModel.disabled = false;
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
    this.customModel.isAmend = true;
    this.customModel.editMode = false;
    this.customModel.model = { ...data };

    setTimeout(() => {
      this.customModel.editMode = true;
    }, 0);
  }

  updateDesignation() {
    //console.log(this.customModel.model)
    this.customModel.disabled = true;
    this.designationService
      .updateDesignation(this.customModel.model)
      .pipe(
        finalize(() => {
          this.customModel.disabled = false;
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
    this.customModel.gridLoad = true;
    this.getAllDesignation();
  }

  pullData() {
    this.getAllDesignation();
  }

  reset() {
    this.customModel.model = {};
    this.customModel.editMode = false;
    this.customModel.isAmend = false;
    this.utilService.resetDropDown();
  }
}
