import { createSelector } from '@ngrx/store';
import { Action } from '../action';
import {
  COMPANY_ADD,
  COMPANY_DELETE,
  COMPANY_LIST_REQUEST,
  COMPANY_LIST_SUCCESS,
  COMPANY_UPDATE,
} from '../action/company-action';

import { StoreUtility } from '../redux-utility/store-utility';

export interface CompanyReducerState {
  loading: boolean;
  loaded: boolean;
  entities: { [id: number]: any };
  ids: number[];
}

const initialState: CompanyReducerState = {
  loaded: false,
  loading: false,
  entities: {},
  ids: [],
};

export function CompanyReducer(
  state = initialState,
  action: Action
): CompanyReducerState | any {
  switch (action.type) {
    case COMPANY_LIST_REQUEST: {
      //console.log(state);
      return { ...state, loading: true };
    }
    case COMPANY_LIST_SUCCESS: {
      const company = action.payload.data;
      const obj = StoreUtility.normalize(company);
      const newEntities = { ...state.entities, ...obj };
      const ids = company.map((d: any) => d.id);
      const newIds = StoreUtility.filterDuplicate([...state.ids, ...ids]);
      return {
        ...state,
        ...{
          loaded: true,
          loading: false,
          entities: newEntities,
          ids: newIds,
        },
      };
    }
    case COMPANY_ADD: {
      const companyData = action.payload.data;
      const entity = { [companyData.id]: companyData };
      const newEntities = { ...state.entities, ...entity };
      //console.log(entity)
      const newIds = StoreUtility.filterDuplicate([
        ...state.ids,
        companyData.id,
      ]);
      //console.log( { ...state, ...{ entities: newEntities, ids: newIds } })
      return { ...state, ...{ entities: newEntities, ids: newIds } };
    }
    case COMPANY_UPDATE: {
      const companyData = action.payload.data;
      //console.log(companyData)
      const entity = { [companyData.id]: companyData };
      const updateEntities = { ...state.entities, ...entity };
      return { ...state, ...{ entities: updateEntities } };
    }
    case COMPANY_DELETE: {
      const id = action.payload.id;
      const newIds = state.ids.filter((elem) => elem !== id);
      const newEntities = StoreUtility.removeKey(state.entities, id);
      return { ...state, ...{ entities: newEntities, ids: newIds } };
    }
    default: {
      return state;
    }
  }
}

export const getLoading = (state: CompanyReducerState) => state.loading;
export const getLoaded = (state: CompanyReducerState) => state.loaded;
export const getEntities = (state: CompanyReducerState) => state.entities;
export const getIds = (state: CompanyReducerState) => state.ids;

export const getCompanies = createSelector(
  getEntities,
  getIds,
  (entities, ids) => {
    // console.log('ent',entities[10047])
    // console.log('ids',ids)
    return ids.map((id) => entities[id]);
  }
);
