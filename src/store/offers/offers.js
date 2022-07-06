import {
  setCity,
  setSort,
  setId,
  offersLoad,
  offersUpdate
} from '../action';
import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  city: `Paris`,
  sort: `Popular`,
  isDataLoaded: false,
};

const offers = createReducer(initialState, (builder) => {
  builder.addCase(setCity, (state, action) => {
    state.city = action.payload;
  });
  builder.addCase(setSort, (state, action) => {
    state.sort = action.payload;
  });
  builder.addCase(setId, (state, action) => {
    state.id = action.payload;
  });
  builder.addCase(offersLoad, (state, action) => {
    state.cards = action.payload;
    state.isDataLoaded = true;
  });
  builder.addCase(offersUpdate, (state, action) => {
    state.cards = state.cards && state.cards.map(((item) => {
      if (item.id === action.payload.id) {
        return action.payload;
      }
      return item;
    }));
  });
});

export {offers};
