import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-utility-box',
  templateUrl: './utility-box.component.html',
  styleUrls: ['./utility-box.component.scss'],
})
export class UtilityBoxComponent implements OnInit {
  @Input() url = '';
  @Output() reset = new EventEmitter();
  @Output() validationReset = new EventEmitter();
  @Output() help = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onReset() {
    this.reset.emit();
  }

  onValidationReset() {
    this.validationReset.emit();
  }

  onHelp() {
    this.help.emit();
  }
}
