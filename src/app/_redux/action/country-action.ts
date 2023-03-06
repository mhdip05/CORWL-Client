export const COUNTRY_LIST_REQUEST = 'country list request';
export const COUNTRY_LIST_BY_COUNTRY_SUCCESS = 'country list by country request';
export const COUNTRY_LIST_SUCCESS = 'country list success';
export const COUNTRY_LIST_FAILED = 'country list failed';
export const COUNTRY_UPDATE = 'country update';
export const COUNTRY_ADD = 'country add';


export class CountryListRequestAction {
  readonly type = COUNTRY_LIST_REQUEST;
}

export class CountryListSuccessAction {
  readonly type = COUNTRY_LIST_SUCCESS;
  constructor(public payload?: { data: [] }) {}
}

export class CountryAddAction {
  readonly type = COUNTRY_ADD;
  constructor(public payload?: { data: any }) {}
}

export class CountryUpdateAction {
  readonly type = COUNTRY_UPDATE;
  constructor(public payload?: { id: number; data: any }) {}
}
