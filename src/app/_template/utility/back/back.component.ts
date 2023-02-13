import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.scss']
})
export class BackComponent implements OnInit {
  @Input() url:any = null;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  back(){
    if(this.url != null){
      this.router.navigateByUrl(this.url)
    }
  }

}
