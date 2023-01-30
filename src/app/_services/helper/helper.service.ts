import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

  private autoclick() {
    setTimeout(() => {
      document
        .querySelector('.p-dropdown-filter')
        ?.setAttribute('id', 'p-dropdown-filter');
      setTimeout(() => {
        var a = document.getElementById('p-dropdown-filter');
        a?.click();
      }, 500);
    }, 100);
  }
}
