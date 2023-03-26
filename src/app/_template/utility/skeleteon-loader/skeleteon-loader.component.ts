import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleteon-loader',
  templateUrl: './skeleteon-loader.component.html',
  styleUrls: ['./skeleteon-loader.component.scss']
})
export class SkeleteonLoaderComponent implements OnInit {

  @Input() isLoaderShow = false; 
  @Input() count = 5;
  constructor() { }

  ngOnInit(): void {
  }

}
