import {requiredAuthorization, getFavorites, postFavorite} from '../action';
import {createReducer} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../../const';

const initialState = {
  isLoadFavorites: false,
  isLoadStatus: false,
  authorizationStatus: AuthorizationStatus.NO_AUTH
};

const user = createReducer(initialState, (builder) => {
  builder.addCase(requiredAuthorization, (state, action) => {
    state.authorizationStatus = action.payload.status;
    state.user = action.payload.user;
    state.isLoadStatus = true;
  });
  builder.addCase(getFavorites, (state, action) => {
    state.favorites = action.payload;
    state.isLoadFavorites = true;
  });
  builder.addCase(postFavorite, (state) => {
    state.isLoadFavorites = false;
  });
});

export {user};
