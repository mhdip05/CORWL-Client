import { Injectable, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  turnModalStateErrorOn = true;
  turnLoadingBarOn = true;

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {}

  dropdownDefaultText = (text?: string) => {
    if (text == undefined || text == null) {
      return `========= Select =========`;
    }
    return `========= Select ${text} =========`;
  };

  resetDropDown = () => {
    var list: any = document.getElementsByClassName('p-dropdown-clear-icon');
    if (list.length === 0) return;
    for (var i = 0; i < list.length; i++) {
      list[i]?.click();
    }
  };

  successMessage = (detail: string, lifeSpan?: number | null) => {
    return {
      icon: 'pi-check-circle',
      severity: 'success',
      summary: 'Success',
      sticky: false,
      life: lifeSpan == (null || undefined) ? 1700 : lifeSpan,
      detail: detail,
    };
  };

  dangerMessage = (detail: string, lifeSpan?: number | null) => {
    return {
      icon: 'pi-times-circle',
      severity: 'error',
      summary: 'Validation',
      sticky: false,
      life: lifeSpan == (null || undefined) ? 1700 : lifeSpan,
      detail: detail,
    };
  };

  queryParamsSanitization = () => {
    this.activatedRoute.queryParams.subscribe({
      next: (v: any) => {
        if (Object.keys(v).length > 0) {
          this.route.navigateByUrl(this.route.url.split('?')[0]);
        }
      },
    });
  };

  checkIntegerInUrl = (intData: number) => {
    if (!(intData > 0) || intData.toString().length > 11) {
      alert('Please check weather your URL is valid or not.');
      return false;
    } else {
      return true;
    }
  };

  lastInsertedData = (data: any) => {
    data.unshift(data.pop());
    return data;
  };

  errorValidation: any = (e: any) => {
    if (e.error.errors) {
      return e.error.errors;
    } else if (e.error) {
      return { dbError: e.error };
    } else {
      return { dbError: 'Something went wrong' };
    }
  };
}
