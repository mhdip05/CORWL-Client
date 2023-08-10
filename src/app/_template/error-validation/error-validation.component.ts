import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-validation',
  templateUrl: './error-validation.component.html',
  styleUrls: ['./error-validation.component.scss']
})
export class ErrorValidationComponent implements OnInit {
  @Input() hasValidation = false;
  @Input() validationModel = [];

  constructor() { }

  ngOnInit(): void {
  }

}
