import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { filter, finalize, map, switchMap, take } from 'rxjs';
import { CustomModel } from 'src/app/_models/CustomModel';
import { UtilsService } from 'src/app/_services/utils/utils.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {  
  customModel = new CustomModel();
  inputClass = 'form-control form-control-sm';
  responsiveClass =
    'col-xl-3 col-lg-6 col-md-12 col-sm-12 col-xs-12 input-margin-bottom';

  constructor(
    private router: Router,
    private utilService: UtilsService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.customModel.disabled = true;
    this.utilService.queryParamsSanitization();
    this.utilService.turnModalStateErrorOn = false;

    if (this.activatedRoute.snapshot.params['id'] !== undefined) {
       this.customModel.disabled = false;
       this.customModel.isAmend = true;
    }
  }

  ngOnDestroy(): void {
    this.utilService.turnModalStateErrorOn = true;
  }

  changeTab(event:any){
    console.log(event)
    console.log(event.originalEvent.target.innerText)
  }

}
