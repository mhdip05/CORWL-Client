import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  @Input() display = false;
  @Input() position:any = "top";
  @Input() contentDetails = 'Are you sure to proceed ?'
  @Output() hideDialog = new EventEmitter()
  @Output() accept = new EventEmitter()
  constructor() { }

  ngOnInit(): void {

  }

  onHide(){
    this.hideDialog.emit()
  }

  onReject(){
    this.display = false;
  }

  onAccept(){
    this.accept.emit();
  }

}
