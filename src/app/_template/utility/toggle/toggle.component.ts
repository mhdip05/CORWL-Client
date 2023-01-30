import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent implements OnInit {
  @Input()  isHide = false;
  @Output() isToggle = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  toggle() {
    this.isToggle.emit();
  }
}
