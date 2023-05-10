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
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit, AfterViewInit {
  @ViewChild('imageContainer', { static: false }) imageContainer!: ElementRef;
  @ViewChild('fileUpload') fileUpload: FileUpload | any;

  files: any[] = []
  noContent = false;
  style = { display: 'block' };
  removedFiles: any = [];

  @Input() showUploadButton = false;
  @Input() maxFileSize = 5000000;
  @Input() accept = 'image/*';
  @Input() fileLimit = 1;
  @Input() name = 'file[]';
  @Output() uploadFile = new EventEmitter();
  @Output() clearAllFile = new EventEmitter();
  @Output() tests = new EventEmitter();

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {

  }

  handleFileSelect(event: any) {
    this.setAttributeToCancelButton();
    for (let file of event.files) {
      const lastDotIndex = file.name.lastIndexOf('.');
      const fileType = file.name.substring(lastDotIndex + 1).toLowerCase();
      file.fileType = fileType;
      this.files.push(file);
    }
    this.uploadFile.emit(event.currentFiles);
  }

  setAttributeToCancelButton() {
    const cancelButton = this.elRef.nativeElement.querySelector('.p-fileupload-buttonbar');
    cancelButton.children[1].children[0].setAttribute('id','file-upload-cancel-btn')
    //console.log(cancelButton.children[1].children[0])
  }

  clearAllFiles() {
    this.clearAllFile.emit();
  }

  remove(index: any) {
    const fileToRemove = this.files[index];
    const rowToRemove = this.imageContainer.nativeElement.querySelector(
      `div[data-fileid="${fileToRemove.file.name}"]`
    );
    rowToRemove.remove();

    if (this.files.length > 1) {
      this.files.splice(index, 1);
    } else {
      this.files = [];
    }
    this.removedFiles.push(fileToRemove);
    console.log(this.removedFiles);
  }

  oldremove(index: any) {
    // console.log(this.files)
    // this.files.splice(index,1)

    // console.log(this.files)

    // const fileToRemove = this.files[index];
    // fileToRemove.fileRow.remove();
    // this.files.splice(index, 1);

    const fileToRemove = this.files[index];
    const rowToRemove = this.imageContainer.nativeElement.querySelector(
      `div[data-fileid="${fileToRemove.file.name}"]`
    );
    //rowToRemove.style.display = "none"
    // this.files.splice(index, 1);

    setTimeout(() => {
      rowToRemove.remove();
    }, 200);
    //this.files.splice(index, 1);

    console.log(this.imageContainer);
    console.log(rowToRemove);
    //console.log(fileToRemove.file.name)
  }

  test() {
    this.style = { display: 'none' };
  }

  viewWithReader() {
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = () => {
    //   file.preview = reader.result;
    //   this.files.push(file);
    // };
  }
}
