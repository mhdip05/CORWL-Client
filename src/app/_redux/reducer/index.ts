import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromCompany from './company-reducer';
import * as fromCurrency from './currency-reducer';
import * as fromCity from './city-reducer';

export interface RootReducerState {
  companies: fromCompany.CompanyReducerState;
  currencies:fromCurrency.CurrencyReducerState;
  cities: fromCity.CityReducerState
}

export const rootReducer: ActionReducerMap<RootReducerState> | any = {
  companies: fromCompany.CompanyReducer, 
  currencies: fromCurrency.CurrencyReduer,
  cities: fromCity.CityReduer
};

//#region company state and it's selector
export const getCompanyState = (state: RootReducerState) => state.companies;
export const getCompanyLoaded = createSelector(getCompanyState,fromCompany.getLoaded);
export const getCompanyLoading = createSelector(getCompanyState,fromCompany.getLoading);
export const getCompanies = createSelector(getCompanyState,fromCompany.getCompanies);

// to view a single item first of all we fetch all the entties
export const getCompanyEntities = createSelector(getCompanyState, fromCompany.getEntities);
export const getCompanyById =  (state:RootReducerState, id:number) => {
   const entties = getCompanyEntities(state)
   return entties[id]
}
//#endregion

//#region currency state and it's selector
export const getCurrencyState = (state:RootReducerState) => state.currencies;
export const getCurrencyLoaded = createSelector(getCurrencyState, fromCurrency.getLoaded)
export const getCurrencyLoading = createSelector(getCurrencyState, fromCurrency.getLoading)
export const getCurrencies = createSelector(getCurrencyState, fromCurrency.getCurrencies)

//#endregion

//#region city state and it's selector
export const getCityState = (state:RootReducerState) => state.cities;
export const getCityLoaded = createSelector(getCityState, fromCity.getLoaded)
export const getCityLoading = createSelector(getCityState, fromCity.getLoading)
export const getCities = createSelector(getCityState, fromCity.getCities)
export const getCityByCountry = createSelector(getCityState, fromCity.getCitiesByCountry)

//#endregion