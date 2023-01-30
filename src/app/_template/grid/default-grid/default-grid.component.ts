import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-default-grid',
  templateUrl: './default-grid.component.html',
  styleUrls: ['./default-grid.component.scss'],
})
export class DefaultGridComponent implements OnInit, AfterViewInit {
  // ------------- Grid ------------------
  @Input() cols!: any[];
  @Input() data!: any[];
  @Input() rowWidth = '0px';
  @Input() gridStyleClass = '';
  @Input() gridHeight = '400px'; 
  @Input() scrollable = true; 
  @Input() showOverlay = false;
  @Input() showToolbar = false;
  @Input() isShrinkGridData = false;
  @Input() turnDataFilterOn = false;
  @Input() isShrinkGridHeader = false;


  //---------------- Set Data----------------- 
  @Input() hasBtnSetData = false;
  @Input() btnSetDataLabel = 'Set Data';  
  @Output() setDataEvent = new EventEmitter();

  // ----------Edit and Delete Button --------
  @Input() actionStyle = {};
  @Input() hasAction = true;
  @Input() isButtonIconable = true;
  @Input() hasGridModifyButton = true;
  @Input() hasGridDeleteButton = true;
  @Input() iconClass = 'pi pi-pencil';
  @Input() modifyButtonName  = 'Modify';
  @Input() modifyButtonClass = 'p-button-rounded p-button-success mr-2';
  @Input() deleteButtonName  = 'Delete';
  @Input() delteButtonClass  = 'p-button-rounded p-button-warning';
  @Input() addButtonNewDataClass = 'p-button-primary';
 
  @Output() modifyEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();

  @ViewChild('dt') gridData: ElementRef | any;
  @ViewChild('globalFilterInput') globalFilterInput!: ElementRef;

  rowData = {};
  filterByText = false;
  filterByMenu = false;
  applyCustomWidth = false; 
  display: boolean = false;

  constructor(private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.gridInitialization();
  }

  setData() {
    this.setDataEvent.emit();
  }

  ngAfterViewInit(): void {
    //this.clear(this.marker);
    //console.log(this.gridDataChildren)
    //console.log(this.marker.el)
  }

  gridInitialization() {
    setTimeout(() => {
      return this.cols.length > 6
        ? this.applyFilterModification()
        : this.filterOnResize();
    }, 100);
  }

  // @HostListener('window:resize', ['$event'])
  // onResize() {
  //   this.filterOnResize();

  //   setTimeout(() => {
  //     this.clear(this.gridData);
  //   }, 80);
  // }

  // @HostListener('window:onkeypress', ['$event'])
  // onTabKeyPress() {
  //   //alert('hello');
  // }

  onResized(event: any): void {
    if (this.turnDataFilterOn == false) return;
    this.filterOnResize();
    setTimeout(() => {
      this.clear(this.gridData);
    }, 80);
  }

  filterOnResize() {
    if (this.turnDataFilterOn == false) return;
    if (this.cols.length <= 6) {
      if (window.innerWidth < 1700) {
        this.filterByMenu = true;
        this.filterByText = false;
      } else {
        this.filterByText = true;
        this.filterByMenu = false;
      }
    }
  }

  modifyRowData(rowData: any) {
    this.modifyEvent.emit(rowData);
  }

  deleteRowData(rowData: any) {
    this.deleteEvent.emit(rowData);
  }

  hideDialog(){
    this.display = false;
  }

  readyToDelete(rowData: any) {
   this.display = true;
   this.rowData = rowData;
  }

  deleteConfirmation(){
    this.deleteEvent.emit(this.rowData);
    setTimeout(() => {
      this.display = false;
    }, 100);
  }

  applyFilterModification() {
    this.cols.length > 6
      ? (this.filterByMenu = !this.filterByText)
      : (this.filterByText = !this.filterByMenu);
  }

  clear(table: Table) {
    table.clear();
    this.globalFilterInput.nativeElement.value = '';
  }

  getRowData(rowData: any) {
    if (typeof rowData === 'string') return rowData.substring(0, 30);
    return rowData;
  }

  overLay(template: any, $event: any) {
    if (this.showOverlay) template.toggle($event);
  }

  shrinkGridHeader() {
    if (this.isShrinkGridHeader)
      return {
        'white-space': 'normal',
      };
    return {};
  }

  shrinkGridData() {
    if (this.isShrinkGridData) return { 'white-space': 'normal' };
    return {};
  }
}
