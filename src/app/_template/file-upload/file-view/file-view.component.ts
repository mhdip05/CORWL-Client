import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, Renderer2, ViewChildren } from '@angular/core';
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
  @Input() url: string = environment.apiUrl + 'file/getfile/';
  @Input() directory: string = '';
  @Input() subdirectory: string | null = null;
  @Output() deleteFile = new EventEmitter();

  constructor(private renderer:Renderer2) {}

  ngOnInit(): void {}

  removeFileFromTheDom(id:number){
    const div = document.getElementById(`file_${id}`)
    if(div){
      this.renderer.removeChild(div.parentNode, div)
    }
  }

  showDialog(id:number){
    this.display = true;
    this.fileId = id;
  }

  hideDialog(){
    this.display = false;
    this.fileId = 0;
  }

  removeFile(){
    this.removeFileFromTheDom(this.fileId)
    this.display = false;
  }
}
