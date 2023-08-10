export const CITY_LIST_REQUEST = 'city list request';
export const CITY_LIST_BY_COUNTRY_SUCCESS = 'city list by country request';
export const CITY_LIST_SUCCESS = 'city list success';
export const CITY_LIST_FAILED = 'city list failed';
export const CITY_DELETE = 'city delete';
export const CITY_UPDATE = 'city update';
export const CITY_ADD = 'city add';
export const CITY_EMPTY = 'make city lsit empty';

export class CityListRequestAction {
  readonly type = CITY_LIST_REQUEST;
}

export class CityListByCountrySuccessAction {
  readonly type = CITY_LIST_BY_COUNTRY_SUCCESS;
  constructor(public payload?: { data: [] }) {}
}

export class CityListSuccessAction {
  readonly type = CITY_LIST_SUCCESS;
  constructor(public payload?: { data: [] }) {}
}

export class CityAddAction {
  readonly type = CITY_ADD;
  constructor(public payload?: { data: any }) {}
}

export class CityUpdateAction {
  readonly type = CITY_UPDATE;
  constructor(public payload?: { id: number; data: any }) {}
}

export class CityDeleteAction {
  readonly type = CITY_DELETE;
  constructor(public payload?: { id: number }) {}
}

export class CityEmpty {
  readonly type = CITY_EMPTY;
}
