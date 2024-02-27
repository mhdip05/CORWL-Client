import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.scss'],
})
export class DialogModalComponent implements OnInit {
  @Input() position:Dialog["position"] = "top"
  @Input() header = "Title"
  @Input() display = false;
  @Input() breakpoints="{'960px': '75vw', '640px': '100vw'}";
  @Input() style = {width: '40%'}
  @Input() data = []
  @Output() hideModal = new EventEmitter()

  constructor() {}

  ngOnInit(): void {}

  onHide(){
    this.display = false;
    this.data = []
    this.hideModal.emit()
    //console.log(this.display)
  }
}
