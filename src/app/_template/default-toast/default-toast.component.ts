import { style } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { ToastPositionType } from 'primeng/toast';

@Component({
  selector: 'app-default-toast',
  templateUrl: './default-toast.component.html',
  styleUrls: ['./default-toast.component.scss'],
})
export class DefaultToastComponent implements OnInit {
  @Input() position:ToastPositionType = "top-center";
  @Input() style = {
    'opacity': '0.9',
    'font-style': 'italic',
    'font-weight': 'bold',
    'font-size':'17px',
  };
  constructor() {}

  ngOnInit(): void {}
}
