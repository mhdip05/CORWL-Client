import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.scss'],
})
export class DialogModalComponent implements OnInit {
  @Input() position = "bottom-right"
  @Input() header = "Title"
  @Input() display = false;
  @Input() breakpoints="{'960px': '75vw', '640px': '100vw'}";
  @Input() data = []

  constructor() {}

  ngOnInit(): void {}

  onHide(){
    console.log("hello")
    this.display = false;
    this.data = []
  }
}
