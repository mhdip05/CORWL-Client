import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UtilsService } from 'src/app/_services/utils/utils.service';

@Component({
  selector: 'app-basic-settings',
  templateUrl: './basic-settings.component.html',
  styleUrls: ['./basic-settings.component.scss'],
})
export class BasicSettingsComponent implements OnInit {
  items!: MenuItem[];
  selectedMenuItem:any = 'country';
  
  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.utilsService.queryParamsSanitization();
    this.items = [
      {
        label: 'Set Country',
        icon:'pi pi-fw pi-map',
        command: () => {
          this.selectedMenu('country');
        },
      },
      {
        label: 'Set City',
        icon:'pi pi-fw pi-map-marker',
        command: () => {
          this.selectedMenu('city');
        },
      },
      {
        label: 'Set Currency',
        icon:'pi pi-fw pi-dollar',
        command: () => {
          this.selectedMenu('currency');
        },
      },
    ];
  }

  selectedMenu(item: string) {
    //console.log(item);
    this.selectedMenuItem = item;
  }
}
