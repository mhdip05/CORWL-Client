import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { filter, take } from 'rxjs';
import { BranchService } from 'src/app/_services/branch/branch.service';
import { UtilsService } from 'src/app/_services/utils/utils.service';

@Component({
  selector: 'app-branch-dropdown',
  templateUrl: './branch-dropdown.component.html',
  styleUrls: ['./branch-dropdown.component.scss']
})
export class BranchDropdownComponent implements OnInit {

  showClear = true;
  currentbranches: any = [];
  emptyMessage = 'No Record Found';

  @Input() branches: any = [];
  @Input() disabledBranch = false;
  @Input() load = false;
  @Input() selectedBranch: any;
  @Input() applyDefaultText = false;
  @Output() changeBranch = new EventEmitter();
  @Output() onBlur = new EventEmitter();

  constructor(
    private branchService: BranchService,
    private utilService: UtilsService
  ) {}

  ngOnInit(): void {
    //console.log(this.selectedBranch, this.branches)
    this.showClear = false;
  }

  onChange() {
    //console.log('onChange', this.selectedBranch);
    if (this.selectedBranch == null) {
      this.showClear = false;
      this.selectedBranch = { BranchName: null, BranchId: 0 };
      this.changeBranch.emit(this.selectedBranch);
      return;
    }

    this.showClear = true;
    this.changeBranch.emit(this.selectedBranch);
  }

  onBlurEvent(event:any){
    this.onBlur.emit(event);
  }

  onShow() {
    if (this.currentbranches.length > 0) {
      this.branches = this.currentbranches;
      return;
    }
    this.branchService
      .getBranchDropdown()
      .pipe(
        filter((res: any) => res.length > 0),
        take(1)
      )
      .subscribe({
        next: (res: any) => {
          let empty: any = [];
          if (this.applyDefaultText == true) {
            empty = [
              {
                branchName: this.utilService.dropdownDefaultText(),
                branchId: -1,
              },
            ];
          }
          this.branches = [...empty,...res];
          this.currentbranches = [...empty,...res];
        },
      });
  }

}
