import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-default-grid',
  templateUrl: './default-grid.component.html',
  styleUrls: ['./default-grid.component.scss']
})
export class DefaultGridComponent implements OnInit {
  @Input() cols!: any[]
  @Input() data!: any[]
  @Input() hasAction: boolean = true;
  @Input() hasGridModifyButton: boolean = true;
  @Input() gridModifyButtonName: string = 'Modify'
  @Input() hasGridDeleteButton: boolean = true
  @Input() gridDeleteButtonName: string = 'Delete'

  @Output() modifyEvent = new EventEmitter()
  @Output() deleteEvent = new EventEmitter()

  constructor() { }

  ngOnInit(): void {

  }

  modifyRowData(rowData: any) {
    this.modifyEvent.emit(rowData)
  }

  deleteRowData(rowData:any){
    this.deleteEvent.emit(rowData)
  }

}
