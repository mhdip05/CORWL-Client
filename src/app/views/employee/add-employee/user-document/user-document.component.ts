import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { CustomModel } from 'src/app/_models/CustomModel';
import { DesignModel } from 'src/app/_models/DesignModel';
import { EmployeeService } from 'src/app/_services/employee/employee.service';
import { UtilsService } from 'src/app/_services/utils/utils.service';
import { FileService } from 'src/app/_services/file/file.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-user-document',
  templateUrl: './user-document.component.html',
  styleUrls: ['./user-document.component.scss'],
})
export class UserDocumentComponent implements OnInit, AfterViewInit {
  @Input() documentInfoData: any;
  customModel = new CustomModel();
  designModel = new DesignModel();
  env = environment.apiUrl;
  files: any = [];
  isFileAvailable = false;
  showFileByModal = false;
  isGeneralInfoButton = false;
  azureBlobContainerToken = '';

  constructor(
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private utilService: UtilsService,
    private activatedRoute: ActivatedRoute,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['id'] !== undefined) {
      this.customModel.model = {
        ...this.customModel.model,
        ...{ employeeId: this.activatedRoute.snapshot.params['id'] },
      };
    }
  }

  ngAfterViewInit(): void {}

  getDocumentInfo() {
    this.getAzureBlobToken();
    this.employeeService
      .getDocumentMasterInfoByEmployee(this.customModel.model.employeeId)
      .subscribe({
        next: (v: any) => {
          //console.log(v);
          if (v == null) return;
          this.customModel.model = v.docmasterData;
          this.files = v.docDetailsData;

          this.files.length > 0
            ? (this.isFileAvailable = true)
            : (this.isFileAvailable = false);
          this.showFileByModal = false;
          this.isGeneralInfoButton = true;
        },
      });
  }

  getAzureBlobToken() {
    this.fileService.getAzureToken().subscribe({
      next: (v: any) => {
        this.azureBlobContainerToken = v.azureBlobContainerToken;
        //console.log(this.azureBlobContainerToken);
      },
    });
  }

  updateDocumentMasterData() {
    this.employeeService
      .updateDocumentMaster(this.customModel.model)
      .subscribe({
        next: (v: any) => {
          this.messageService.add(
            this.utilService.successMessage(v.message, 2000)
          );
        },
        error: (e) => {
          this.displayError(e);
        },
      });
  }

  addDocumentInfo() {
    this.customModel.disabled = true;
    this.employeeService
      .saveEmployeeDocumentInfo(this.customModel.withFormData())
      .pipe(
        finalize(() => {
          this.customModel.disabled = false;
        })
      )
      .subscribe({
        next: (v: any) => {
          console.log(v);
          if (v.status == true) {
            this.messageService.add(
              this.utilService.successMessage(v.message, 2000)
            );
            this.isFileAvailable = true;
            this.showFileByModal = true;
            this.isGeneralInfoButton = true;
            this.customModel.clearAllFiles();
            this.clearFileFromCache();
          }
        },
        error: (e) => {
          //console.log(e);
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

  clearFileFromCache() {
    const myElement = document.getElementById('file-upload-cancel-btn');
    if (myElement) myElement.click();
  }

  showFile() {
    if (this.showFileByModal == true) {
      this.employeeService
        .getDocumentMasterInfoByEmployee(this.customModel.model.employeeId)
        .subscribe({
          next: (v: any) => {
            //console.log(v);
            this.files = v.docDetailsData;
          },
          complete: () => {
            this.customModel.displayModal = true;
            this.showFileByModal = false;
          },
        });
    } else {
      this.customModel.displayModal = true;
    }
  }

  deleteFile(data: any) {
    const fileId = data.fileId;
    this.employeeService
      .deleteEmpoloyeeDoc(fileId, this.customModel.model.employeeId)
      .subscribe();
    if (data.currentFileLength == 0) {
      this.customModel.displayModal = false;
      this.isFileAvailable = false;
    }
  }

  DeleteEmployeeDocsFromAzure(data: any) {
    const fileId = data.fileId;
    this.employeeService.DeleteEmployeeDocsFromAzure(fileId).subscribe({});
    if (data.currentFileLength == 0) {
      this.customModel.displayModal = false;
      this.isFileAvailable = false;
    }
  }
}
