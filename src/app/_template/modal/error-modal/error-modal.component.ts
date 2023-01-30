import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UtilsService } from 'src/app/_services/utils/utils.service';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent implements OnInit {
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
