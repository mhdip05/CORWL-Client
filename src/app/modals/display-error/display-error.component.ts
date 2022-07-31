import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IErrorModal } from 'src/app/_interface/IErrorModal';

@Component({
  selector: 'app-display-error',
  templateUrl: './display-error.component.html',
  styleUrls: ['./display-error.component.scss']
})
export class DisplayErrorComponent implements OnInit {

  title:any;
  message = []
  
  constructor(private basModalRef:BsModalRef) {
   
  }

  ngOnInit(): void {

  }

  Decline(){
    this.basModalRef.hide();
  }
}
