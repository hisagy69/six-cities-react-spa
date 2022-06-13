import {NameSpace} from '../root-reducer';

export const getAuthorizationStatus = (state) => state[NameSpace.USER].authorizationStatus;
export const getLoadStatus = (state) => state[NameSpace.USER].isLoadStatus;
export const getUser = (state) => state[NameSpace.USER].user;
export const getLoadFavoritesStatus = (state) => state[NameSpace.USER].isLoadFavorites;
export const getFavorites = (state) => state[NameSpace.USER].favorites;
