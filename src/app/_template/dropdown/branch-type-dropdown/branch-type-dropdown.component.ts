import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface BranchType {
  branchType: string | null;
}

@Component({
  selector: 'app-branch-type-dropdown',
  templateUrl: './branch-type-dropdown.component.html',
  styleUrls: ['./branch-type-dropdown.component.scss'],
})
export class BranchTypeDropdownComponent implements OnInit {
  @Input() branchTypes!: BranchType[];
  @Input() selectedBranchType!: BranchType | undefined;
  showClear = true;
  @Output() changeBranchType = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.branchTypeList();
  }

  branchTypeList() {
    this.branchTypes = [
      { branchType: 'Corporate' },
      { branchType: 'Manufacture' },
    ];
  }

  onShow() {
    this.branchTypeList();
  }

  onChange() {
    if (
      this.selectedBranchType == null ||
      this.selectedBranchType.branchType == null
    ) {
      this.checkSelected();
      return;
    }

    this.showClear = true;
    this.changeBranchType.emit(this.selectedBranchType);
  }

  checkSelected() {
    this.showClear = false;
    this.selectedBranchType = { branchType: null };
    this.changeBranchType.emit(this.selectedBranchType);
  }
}
