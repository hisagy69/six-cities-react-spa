import {
  requiredAuthorization,
  userLoad,
  getFavorites,
  postFavorite
} from '../action';
import {createReducer} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../../const';

const initialState = {
  isLoadFavorites: false,
  isLoadStatus: false,
  authorizationStatus: AuthorizationStatus.NO_AUTH
};

const user = createReducer(initialState, (builder) => {
  builder.addCase(requiredAuthorization, (state, action) => {
    state.authorizationStatus = action.payload;
    state.isLoadStatus = true;
  });
  builder.addCase(userLoad, (state, action) => {
    state.user = action.payload;
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
