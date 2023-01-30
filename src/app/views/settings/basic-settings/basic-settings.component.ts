import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/_services/utils/utils.service';

@Component({
  selector: 'app-basic-settings',
  templateUrl: './basic-settings.component.html',
  styleUrls: ['./basic-settings.component.scss'],
})
export class BasicSettingsComponent implements OnInit {
  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.utilsService.queryParamsSanitization()
  }
}
