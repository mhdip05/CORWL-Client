import { createSelector } from '@ngrx/store';
import { Action } from '../action';
import {
  CITY_ADD,
  CITY_DELETE,
  CITY_EMPTY,
  CITY_LIST_BY_COUNTRY_SUCCESS,
  CITY_LIST_REQUEST,
  CITY_LIST_SUCCESS,
  CITY_UPDATE,
} from '../action/city-action';
import { StoreUtility } from '../redux-utility/store-utility';

export interface CityReducerState {
  loading: boolean;
  loaded: boolean;
  entities: { [id: number]: any };
  byCountryEntities: { [cityId: number]: any };
  ids: number[];
}

const initialState: CityReducerState = {
  loading: false,
  loaded: false,
  entities: {},
  byCountryEntities: {},
  ids: [],
};

const successList = (state: any, data: any) => {
  const city = data;
  const obj = StoreUtility.normalize(city);
  const newEntities = { ...state.entities, ...obj };
  const ids = city.map((d: any) => d.id);
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

export function CityReduer(
  state = initialState,
  action: Action
): CityReducerState {
  switch (action.type) {
    case CITY_LIST_REQUEST: {
      return { ...state, loading: true };
    }
    case CITY_LIST_SUCCESS: {
      return successList(state, action.payload.data);
    }
    case CITY_LIST_BY_COUNTRY_SUCCESS: {
      const city = action.payload.data;
      const obj = StoreUtility.normalize(city, true);
      const newEntities = { ...state.byCountryEntities, ...obj };
      const ids = city.map((d: any) => Object.values(d)[0]);
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
    case CITY_ADD: {
      const cityData = action.payload.data;
      const entity = { [cityData.id]: cityData };
      const newEntities = { ...state.entities, ...entity };
      const newIds = StoreUtility.filterDuplicate([...state.ids, cityData.id]);
      const res = { ...state, ...{ entities: newEntities, ids: newIds } };
      //console.log(res);
      return res;
    }
    case CITY_UPDATE: {
      const cityData = action.payload.data;
      const entity = { [cityData.id]: cityData };
      const updateEntities = { ...state.entities, ...entity };
      return { ...state, ...{ entities: updateEntities } };
    }
    case CITY_DELETE: {
      const id = action.payload.id;
      const newIds = state.ids.filter((elem) => elem !== id);
      const newEntities = StoreUtility.removeKey(state.entities, id);
      return { ...state, ...{ entities: newEntities, ids: newIds } };
    }
    case CITY_EMPTY: {
      return { ...state, ...{ byCountryEntities: {}, ids: [] } };
    }
    default: {
      return state;
    }
  }
}

export const getLoaded = (state: CityReducerState) => state.loaded;
export const getLoading = (state: CityReducerState) => state.loading;
export const getEntities = (state: CityReducerState) => state.entities;
export const getByCountryEntities = (state: CityReducerState) =>
  state.byCountryEntities;
export const getIds = (state: CityReducerState) => state.ids;
export const getCities = createSelector(
  getEntities,
  getIds,
  (entities, ids) => {
    return ids.map((id) => entities[id]);
  }
);

export const getCitiesByCountry = createSelector(
  getByCountryEntities,
  getIds,
  (entities, ids) => {
    //console.log(entities)
    return ids.map((id) => entities[id]);
  }
);
