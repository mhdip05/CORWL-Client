import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { CustomModel } from 'src/app/_models/CustomModel';
import { RoleService } from 'src/app/_services/role/role.service';
import { UtilsService } from 'src/app/_services/utils/utils.service';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss'],
})
export class UserRoleComponent implements OnInit {
  customModel = new CustomModel();
  roles: any = [];
  roleId = 0;
  selectedRoles: any = [];
  checkedRoles: any = [];

  constructor(
    private roleService: RoleService,
    private utilService: UtilsService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['id'] !== undefined) {
      this.customModel.model = {
        ...this.customModel.model,
        ...{ employeeId: this.activatedRoute.snapshot.params['id'] },
      };
    }
  }

  change(event: any) {
    //console.log(event)
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.checkedRoles.push(+checkbox.value);
    } else {
      this.removeCheckedRoles(+checkbox.value);
    }
  }

  removeCheckedRoles(roleId: number) {
    this.checkedRoles = this.checkedRoles.filter(
      (element: number) => element !== roleId
    );
  }

  getUserRoles(employeeId: number) {
    this.roleService.getUserRoles(employeeId).subscribe({
      next: (data: any) => {
        if (data.status == false) return;

        const convertedData: any = {};
        data.forEach((item: any) => {
          convertedData[item.roleId] = item.value;
          this.checkedRoles.push(item.roleId);
        });

        this.selectedRoles = convertedData;
      },
      complete: () => {
        this.generateRemoveButton();
      },
    });
  }

  generateRemoveButton() {
    this.roles = this.roles.map((item: any) => ({
      ...item,
      hasRemoveButton: this.checkedRoles.includes(item.id),
    }));
  }

  mapRole() {
    //console.log(this.checkedRoles);
    //return;
    if (this.checkedRoles.length == 0) {
      alert('Please choose at least one role !!');
      return;
    }
    var model = {
      employeeId: this.customModel.model.employeeId,
      roleIds: this.checkedRoles,
    };

    this.customModel.disabled = true;
    this.roleService
      .mapUserRole(model)
      .pipe(
        finalize(() => {
          this.customModel.disabled = false;
        })
      )
      .subscribe({
        next: (v: any) => {
          this.messageService.add(
            this.utilService.successMessage(v.message, 3000)
          );
        },
        complete: () => {
          this.getUserRoles(this.customModel.model.employeeId);
        },
        error: (e) => {
          this.displayError(e);
          this.selectedRoles = [];
          this.checkedRoles = [];
        },
      });
    //console.log(model);
  }

  getAllRole() {
    this.roleService.getAllRole().subscribe({
      next: (v: any) => {
        //console.log(v);
        this.roles = v;
      },
      complete: () => {
        this.getUserRoles(+this.activatedRoute.snapshot.params['id']);
      },
    });
  }

  removeMapping(roleId: number) {
    this.customModel.displayDialog = true;
    this.roleId = roleId;
  }

  removeMappingButton(roleId: number) {
    const roles = this.roles;
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].id === roleId) {
        roles[i].hasRemoveButton = false;
      }
    }

    delete this.selectedRoles[roleId];
    this.checkedRoles = this.checkedRoles.filter(
      (roleId: number) => roleId !== roleId
    );
    //console.log(this.roles)
  }

  acceptRemoveMapping() {
    this.roleService
      .removeUserRole(this.customModel.model.employeeId, this.roleId)
      .subscribe({
        next: (v: any) => {
          this.messageService.add(
            this.utilService.successMessage(v.message, 3000)
          );
        },
        complete: () => {
          this.removeMappingButton(this.roleId);
          this.customModel.displayDialog = false;
        },
      });
  }

  displayError(e: any) {
    const error: any = this.customModel.handleError(e);
    //console.log(error)
    if (error.isDbError) {
      this.messageService.add(
        this.utilService.dangerMessage(error.dbError, 4000)
      );
    }
  }
}
