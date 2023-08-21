import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { FileService } from 'src/app/_services/file/file.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.scss'],
})
export class FileViewComponent implements OnInit {
  display = false;
  fileId = 0;
  @Input() files: any = [];
  @Input() url: string = environment.fileUrl;
  @Input() directory: string = '';
  @Input() subdirectory: string | null = null;
  @Input() azureBlobContainerToken = "";
  @Output() deleteFile = new EventEmitter();

  constructor(private renderer: Renderer2, public fileServie:FileService) {}

  ngOnInit(): void {}

  removeFileFromTheDom(id: number) {
    const div = document.getElementById(`file_${id}`);
    if (div) {
      this.renderer.removeChild(div.parentNode, div);
    }
  }

  showDialog(id: number) {
    this.display = true;
    this.fileId = id;
  }

  hideDialog() {
    this.display = false;
    this.fileId = 0;
  }

  fileLengthAfterRemove(fileId: number) {
    if (this.files.length > 0) {
      for (let i = 0; i < this.files.length; i++) {
        if (this.files[i].id === fileId) {
          this.files.splice(i, 1);
        }
      }
      return this.files.length;
    }
  }

  removeFile() {
    const fileInfo = {
      fileId: this.fileId,
      currentFileLength: this.fileLengthAfterRemove(this.fileId),
    };
    this.removeFileFromTheDom(this.fileId);
    this.display = false;
    this.deleteFile.emit(fileInfo);
  }

  
}
