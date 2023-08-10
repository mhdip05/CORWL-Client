import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UtilsService } from 'src/app/_services/utils/utils.service';

@Component({
  selector: 'app-employee-settings',
  templateUrl: './employee-settings.component.html',
  styleUrls: ['./employee-settings.component.scss']
})
export class EmployeeSettingsComponent implements OnInit {

  items!: MenuItem[];
  selectedMenuItem:any = 'department';

  constructor(private utilsService:UtilsService) { }

  ngOnInit(): void {
    this.utilsService.queryParamsSanitization();
    this.items = [
      {
        label: 'Set Department',
        icon:'pi pi-fw pi-building',
        command: () => {
          this.selectedMenu('department');
        },
      },
      {
        label: 'Set Designation',
        icon:'pi pi-fw pi-user-minus',
        command: () => {
          this.selectedMenu('designation');
        },
      },
      {
        label: 'Set Role',
        icon:'pi pi-fw pi-users',
        command: () => {
          this.selectedMenu('role');
        },
      },
    ]
  }

  selectedMenu(item: string) {
    //console.log(item);
    this.selectedMenuItem = item;
  }

}
