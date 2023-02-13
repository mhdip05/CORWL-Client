import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-menubar',
  templateUrl: './top-menubar.component.html',
  styleUrls: ['./top-menubar.component.scss']
})
export class TopMenubarComponent implements OnInit {
  @Input() items:any = []
  constructor() { }

  ngOnInit(): void {
  }

}
