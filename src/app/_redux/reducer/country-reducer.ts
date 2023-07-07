import { createSelector } from '@ngrx/store';
import { Action } from '../action';
import {
  COUNTRY_ADD,
  COUNTRY_LIST_BY_COUNTRY_SUCCESS,
  COUNTRY_LIST_REQUEST,
  COUNTRY_LIST_SUCCESS,
  COUNTRY_UPDATE,
} from '../action/country-action';
import { StoreUtility } from '../redux-utility/store-utility';

export interface CountryReducerState {
  loading: boolean;
  loaded: boolean;
  entities: { [id: number]: any };
  byCountryEntities: { [countryId: number]: any };
  ids: number[];
}

const initialState: CountryReducerState = {
  loading: false,
  loaded: false,
  entities: {},
  byCountryEntities: {},
  ids: [],
};

const successList = (state: any, data: any) => {
  const country = data;
  const obj = StoreUtility.normalize(country);
  const newEntities = { ...state.entities, ...obj };
  const ids = country.map((d: any) => d.id);
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
  //console.log({...state.entities});
  return res;
};

export function CountryReduer(
  state = initialState,
  action: Action
): CountryReducerState {
  switch (action.type) {
    case COUNTRY_LIST_REQUEST: {
      return { ...state, loading: true };
    }
    case COUNTRY_LIST_SUCCESS: {
      return successList(state, action.payload.data);
    }
    case COUNTRY_LIST_BY_COUNTRY_SUCCESS: {
      const country = action.payload.data;
      const obj = StoreUtility.normalize(country, true);
      const newEntities = { ...state.byCountryEntities, ...obj };
      const ids = country.map((d: any) => Object.values(d)[0]);
      const newIds = StoreUtility.filterDuplicate([...state.ids, ...ids]);
      let res = {
        ...state,
        ...{
          loaded: true,
          loading: false,
          byCountryEntities: newEntities,
          ids: newIds,
        },
      };
      //console.log(res);
      return res;
    }
    case COUNTRY_ADD: {
      const countryData = action.payload.data;
      const entity = { [countryData.id]: countryData };
      const newEntities = { ...state.entities, ...entity };
      const newIds = StoreUtility.filterDuplicate([
        ...state.ids,
        countryData.id,
      ]);
      const res = { ...state, ...{ entities: newEntities, ids: newIds } };
      //console.log(res);
      return res;
    }
    case COUNTRY_UPDATE: {
      const countryData = action.payload.data;
      const entity = { [countryData.id]: countryData };
      const updateEntities = { ...state.entities, ...entity };
      return { ...state, ...{ entities: updateEntities } };
      
    }
    default: {
      return state;
    }
  }
}

export const getLoaded = (state: CountryReducerState) => state.loaded;
export const getLoading = (state: CountryReducerState) => state.loading;
export const getEntities = (state: CountryReducerState) => state.entities;
export const getByCountryEntities = (state: CountryReducerState) =>state.byCountryEntities;
export const getIds = (state: CountryReducerState) => state.ids;
export const getCountries = createSelector(
  getEntities,
  getIds,
  (entities, ids) => {
    return ids.map((id) => entities[id]);
  }
);


