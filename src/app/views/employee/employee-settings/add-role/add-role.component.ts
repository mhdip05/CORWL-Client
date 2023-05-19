import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { GridModel } from 'src/app/_models/GridModel';
import { RoleService } from 'src/app/_services/role/role.service';
import { UtilsService } from 'src/app/_services/utils/utils.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss'],
})
export class AddRoleComponent implements OnInit {
  customModel = new GridModel();
  @Input() showGrid = false;

  constructor(
    private roleService: RoleService,
    private utilService: UtilsService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.column();
    this.getAllRole();
  }

  private column() {
    this.customModel.cols = [
      // {
      //   field: 'id',
      //   header: 'Role Id',
      // },
      {
        field: 'roleName',
        header: 'Role Name',
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
      {
        field: 'createdBy',
        header: 'Created By',
        style: { 'text-transform': 'capitalize' },
      },
    ];
  }

  addRole() {
    this.customModel.disabled = true;
    this.roleService
      .addRole(this.customModel.model)
      .pipe(
        finalize(() => {
          this.customModel.disabled = false;
        })
      )
      .subscribe({
        next: (v: any) => {
          //console.log(v);
          this.messageService.add(
            this.utilService.successMessage(v.message, 2000)
          );
        },
        complete: () => {
          this.customModel.resetAll();
          this.getAllRole();
        },
      });
  }

  updateRole() {
    this.customModel.disabled = true;
    this.roleService.updateRole(this.customModel.model)
    .pipe(finalize(()=>{
      this.customModel.disabled = false;
    }))
    .subscribe({
      next:(v:any)=> {
        this.messageService.add(
          this.utilService.successMessage(v.message, 2000)
        );
      },
      complete: () => {
        this.customModel.resetAll();
        this.getAllRole();        
      }
    })
  }

  getAllRole() {
    this.roleService.getAllRole().subscribe({
      next: (v: any) => {
        this.customModel.data = v;
      },
    });
  }
}
