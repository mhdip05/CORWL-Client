import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CustomModel } from 'src/app/_models/CustomModel';
import { DesignModel } from 'src/app/_models/DesignModel';
import { EmployeeService } from 'src/app/_services/employee/employee.service';
import { UtilsService } from 'src/app/_services/utils/utils.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-user-document',
  templateUrl: './user-document.component.html',
  styleUrls: ['./user-document.component.scss'],
})
export class UserDocumentComponent implements OnInit {
  customModel = new CustomModel();
  designModel = new DesignModel();
  env = environment.apiUrl;
  files:any = []
  @Input() documentInfoData: any;

  constructor(
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private utilService: UtilsService,
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

  setDocumentInfoData() {
    console.log(this.documentInfoData)
    if (this.documentInfoData != null) {    
      this.customModel.model = this.documentInfoData.docmasterData;
      this.files = this.documentInfoData.docDetailsData;
    }
  }

  addDocumentInfo() {
    const formData = new FormData();
    var files = this.customModel.files;

    Object.entries(this.customModel.model).forEach(([key, value]: any) => {
      formData.append(key, value);
    });

    if (files !== undefined) {
      for (const file of files) {
        formData.append('files', file, file.name);
      }
    }

    this.employeeService.saveEmployeeDocumentInfo(formData).subscribe({
      next: (v) => {
        console.log(v);
      },
      error: (e) => {
        console.log(e);
        this.displayError(e);
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

  showFile(){  
    this.setDocumentInfoData();
    setTimeout(() => {
      this.customModel.displayModal = true;
    }, 100);
  }
}
