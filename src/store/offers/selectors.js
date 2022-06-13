import {NameSpace} from '../root-reducer';

export const getActiveId = (state) => state[NameSpace.OFFERS].id;
export const getCityOffers = (state) => state[NameSpace.OFFERS].city;
export const getCards = (state) => state[NameSpace.OFFERS].cards;
export const getSortOffers = (state) => state[NameSpace.OFFERS].sort;
export const getIsDataLoaded = (state) => state[NameSpace.OFFERS].isDataLoaded;
