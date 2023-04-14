import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  uploadedFiles: any = [];
  images: any = [];
  noContent = false;
  @Output() uploadFile = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  files: any[] = [];

  handleFileSelect(event: any) {
    for (let file of event.files) {
      this.files.push(file);
    }
    this.uploadFile.emit(event);
    console.log(event);
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
