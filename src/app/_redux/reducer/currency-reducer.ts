import { createSelector } from '@ngrx/store';
import { Action } from '../action';
import {
  CURRENCY_ADD,
  CURRENCY_DELETE,
  CURRENCY_LIST_REQUEST,
  CURRENCY_LIST_SUCCESS,
  CURRENCY_UPDATE,
} from '../action/currency-action';
import { StoreUtility } from '../redux-utility/store-utility';

export interface CurrencyReducerState {
  loading: boolean;
  loaded: boolean;
  entities: { [id: number]: any };
  ids: number[];
}

const initialState: CurrencyReducerState = {
  loading: false,
  loaded: false,
  entities: {},
  ids: [],
};

export function CurrencyReduer(
  state = initialState,
  action: Action
): CurrencyReducerState {
  switch (action.type) {
    case CURRENCY_LIST_REQUEST: {
      return { ...state, loading: true };
    }
    case CURRENCY_LIST_SUCCESS: {
      const currency = action.payload.data;
      const obj = StoreUtility.normalize(currency);
      const newEntities = { ...state.entities, ...obj };
      const ids = currency.map((d: any) => d.id);
      const newIds = StoreUtility.filterDuplicate([...state.ids, ...ids]);
      var res = {
        ...state,
        ...{
          loaded: true,
          loading: false,
          entities: newEntities,
          ids: newIds,
        },
      };
      //console.log(res);
      return res;
    }
    case CURRENCY_ADD: {
      const currencyData = action.payload.data;
      const entity = { [currencyData.id]: currencyData };
      const newEntities = { ...state.entities, ...entity };
      const newIds = StoreUtility.filterDuplicate([
        ...state.ids,
        currencyData.id,
      ]);
      const res = { ...state, ...{ entities: newEntities, ids: newIds } };
      //console.log(res);
      return res;
    }
    case CURRENCY_UPDATE: {
      const currencyData = action.payload.data;
      const entity = { [currencyData.id]: currencyData };
      const updateEntities = { ...state.entities, ...entity };
      return { ...state, ...{ entities: updateEntities } };
    }
    case CURRENCY_DELETE: {
      const id = action.payload.id;
      const newIds = state.ids.filter((elem) => elem !== id);
      const newEntities = StoreUtility.removeKey(state.entities, id);
      return { ...state, ...{ entities: newEntities, ids: newIds }};
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: CurrencyReducerState) => state.loaded;
export const getLoading = (state: CurrencyReducerState) => state.loading;
export const getEntities = (state: CurrencyReducerState) => state.entities;
export const getIds = (state: CurrencyReducerState) => state.ids;
export const getCurrencies = createSelector(
  getEntities,
  getIds,
  (entities, ids) => {
    return ids.map((id) => entities[id]);
  }
);
