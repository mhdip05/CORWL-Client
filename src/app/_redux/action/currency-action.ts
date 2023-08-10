export const CURRENCY_LIST_REQUEST = 'currency list request';
export const CURRENCY_LIST_SUCCESS = 'currency list success';
export const CURRENCY_LIST_FAILED = 'currency list failed';
export const CURRENCY_DELETE = 'currency delete';
export const CURRENCY_UPDATE = 'currency update';
export const CURRENCY_ADD = 'currency add';

export class CurrencyListRequestAction {
  readonly type = CURRENCY_LIST_REQUEST;
}

export class CurrencyListSuccessAction {
  readonly type = CURRENCY_LIST_SUCCESS;
  constructor(public payload?: { data: [] }) {
    //console.log(payload)
  }
}

export class CurrencyAddAction {
  readonly type = CURRENCY_ADD;
  constructor(public payload?: { data: any }) {}
}

export class CurrencyUpdateAction {
  readonly type = CURRENCY_UPDATE;
  constructor(public payload?: { id: number; data: any }) {}
}

export class CurrencyDeleteAction {
  readonly type = CURRENCY_DELETE;
  constructor(public payload?: { id: number }) {}
}
