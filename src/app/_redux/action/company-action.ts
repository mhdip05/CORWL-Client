export const COMPANY_LIST_REQUEST = 'company list request';
export const COMPANY_LIST_SUCCESS = 'company list success';
export const COMPANY_LIST_FAILED = 'company list failed';
export const COMPANY_DELETE = 'company delete';
export const COMPANY_UPDATE = 'company update';
export const COMPANY_ADD = 'company add';

export class CompanyListRequestAction {
  readonly type = COMPANY_LIST_REQUEST;
}

export class CompanyListSuccessAction {
  readonly type = COMPANY_LIST_SUCCESS;
  constructor(public payload?: { data: [] }) {
    //console.log(payload);
  }
}

export class CompanyDeleteAction {
  readonly type = COMPANY_DELETE;
  constructor(public payload?: { id: number }) {}
}

export class CompanyUpdateAction {
  readonly type = COMPANY_UPDATE;
  constructor(public payload?: { id: number; data: any }) {}
}

export class CompanyAddAction {
  readonly type = COMPANY_ADD;
  constructor(public payload?:{data:any}) {}
}
