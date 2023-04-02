import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { filter, finalize, map, switchMap, take } from 'rxjs';
import { UtilsService } from 'src/app/_services/utils/utils.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  model: any = {};
  rollbackModel: any = {};
  validationModel: any = {};
  isAmend = false;
  editMode = false;
  disabled = false;
  hasValidation = false;


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
    this.editMode = false;
    this.utilService.queryParamsSanitization();
    this.utilService.turnModalStateErrorOn = false;

    if (this.activatedRoute.snapshot.params['id'] !== undefined) {
      this.getCompanyById();
    }
  }

  ngOnDestroy(): void {
    this.utilService.turnModalStateErrorOn = true;
  }

  addCompany() {
 
  }

  getCompanyById() {
    
  }

  viewData(data: any) {
    
  }

  editCompany() {
    
  }

  handleError(error: any) {
    this.hasValidation = true;
    this.validationModel = { ...this.utilService.errorValidation(error) };
    if (this.validationModel.dbError) {
      this.messageService.add(
        this.utilService.dangerMessage(this.validationModel.dbError, 4000)
      );
    }
  }

  changeCountry(data: any) {
   
  }

  changeDropDown(data: any) {
    this.model = { ...this.model, ...data };
  }

  
  

  validationReset() {
    this.validationModel = {};
  }

  reset() {
    this.validationModel = {};
    this.utilService.resetDropDown();
    if (!this.editMode) this.model = {};
    else this.getCompanyById();
  }

}
